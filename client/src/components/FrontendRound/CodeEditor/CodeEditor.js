import React, {useEffect, useState, useRef} from 'react'
import {v4 as uuidv4} from 'uuid'

import {io} from 'socket.io-client'
import { useParams } from 'react-router-dom'
import EditorThemes from '../../../data/EditorThemes'
//Material UI imports 
import { Button, Container, Grid, Select, MenuItem, Input, MenuProps, FormControl, InputLabel, TextField, Box, Paper, Typography } from '@material-ui/core'
import { makeStyles, } from '@material-ui/core'
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import {Code, Build, Brush} from '@material-ui/icons'


//Codemirror imports  ->>DO NOT ALTER<<-
import CodeMirror, { htmlSchema } from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/display/fullscreen.css'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closebrackets'
//Languages Modes
import languageList from '../../../data/languages.json'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/python/python'
import 'codemirror/mode/htmlmixed/htmlmixed'



//Linter features for select languages
import 'codemirror/addon/lint/javascript-lint'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/css-lint'
import 'codemirror/mode/css/css'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/display/fullscreen'


//Editor Themes
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/theme/blackboard.css'
import 'codemirror/theme/material-ocean.css'
import 'codemirror/theme/yeti.css'

import {config} from '../../../data/Config'

//->>DO NOT ALTER<<- Altering import position breaks whole module
window.JSHINT = require('jshint').JSHINT;

const URL = config.url


const soc=io(URL)

const useStyles=makeStyles((theme)=>({
    runButton:{
        float: 'right',
        padding: theme.spacing(2),
        borderColor: '#03C03C',
        color: '#03C03C',
        borderRadius: '0%',
        '&:hover': {
            backgroundColor: '#03C03C',
            color: 'white',
            borderColor: '#03C03C'
        }
    },
    checkButton:{
        float: 'right',
        padding: theme.spacing(2),
        borderColor: '#318CE7',
        color: '#318CE7',
        marginRight: '5px',
        borderRadius: '0%',
        '&:hover': {
            backgroundColor: '#318CE7',
            color: 'white',
            borderColor: '#318CE7'
        }
    },
    syncButton:{
        float: 'right',
        borderRadius: '100%'
    },
    langSelector: {
        width: "200px",
        marginLeft:"20px",
        color: "#ACADAF"
    },
    inputField:
    {
        marginTop: theme.spacing(1),
        width: "300px",
    },
    outputFieldVisible:
    {
        
    },
    outputFieldInvisible: {
        display: 'none'
    },
    paperSurface:
    {
        borderRadius: '0%'
    },

    editorWindow:{
        backgroundColor:"#252520"
    },

    editorText:{
        color:"#ACADAF",
        fontWeight: '600'
    },

    webCam:{
        backgroundColor:"#031632"
    },
    htmlicon:{
        color: 'black',
        backgroundColor: 'red',
        height: '50%'
    },
    cssicon: {
        color: 'black',
        backgroundColor: 'yellow',
        height: '50%'
    },
    jsicon: {
        color: 'black',
        backgroundColor: '#FF8600',
        height: '50%'
    },
    iframe: {
        backgroundColor: 'white'
    }


}))

export default function CodeEditor({id}) {
    const classes=useStyles()
    const editorRef=useRef(null)
    const inputRef=useRef(null)

    const [editor, setEditor]=useState(null)
    const [socket, setSocket]=useState(null)
    const [submissionCode, setSubmissionCode]=useState('')
    const [loading, setLoading]=useState(false)
    const [everLoaded, setEverLoaded]=useState(false)
    const [editorTheme, setEditorTheme]=useState('monokai')
    const [editorLanguage, setEditorLanguage]=useState('C++')
    const [langCode, setLangCode]=useState('54')
    const [stdInput, setStdInput]=useState('')
    const [output, setOutput]=useState('')

    const outputId = `${id.id}output`
    const inputId = `${id.id}input`

    const [outputEditor, setOutputEditor] = useState(null)
    const [inputEditor, setInputEditor] = useState(null)
    const outputRef = useRef(null)

    const [srcDoc, setSrcDoc]=useState(`
    <html>
    <body>
        <div>Hey</div>
    </body>
    </html>
    
    `)
    
    //initalizing all the editors with codeMirror api

    useEffect(()=>{
        if (editorRef==null)
            return 
        
        var myCodeMirror = CodeMirror(editorRef.current, {
            lineNumbers: true,
            mode: 'text/html',
            lint: true,
            theme: editorTheme,
            gutters: ["CodeMirror-lint-markers"],
            fullscreen: true,
            matchBrackets: true,
            autoCloseBrackets: true
        });
        // editorRef.current.editor.display.wrapper.style.height = "500px";
        setEditor(myCodeMirror)

        const editorLanguagePlain = {"id": 43,"name": "Plain Text","mode": "null"}

        var outputCodeMirror = CodeMirror(outputRef.current, {
            lineNumbers: true,
            mode: 'javascript',
            theme: editorTheme,
            gutters: ["CodeMirror-lint-markers"],
            fullscreen: true
        })
        setOutputEditor(outputCodeMirror);

        const inputCodeMirror = CodeMirror(inputRef.current,{
            lineNumbers: true,
            mode: 'text/css',
            theme: editorTheme,
            gutters: ["CodeMirror-lint-markers"],
            fullscreen: true,
        })
        setInputEditor(inputCodeMirror)
        
        //console.log(editor)
    }, [])

    //sending the code to judge zero when hit run and gettig the output

    useEffect(()=>
    {

        if (loading)
        {
            console.log("IT has happened")
            const intervalx=setInterval(()=>{
                console.log("This is up and running")
                fetch("https://judge0-ce.p.rapidapi.com/submissions/"+submissionCode+"?base64_encoded=false&fields=stdout,stderr,status_id,language_id", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "57a8c919cemsh60224f36e8adb22p1df733jsn6e408fcdbaf7",
                    "x-rapidapi-host": "judge0-ce.p.rapidapi.com"
                }
                })
            .then((data)=>data.json())
            .then((json)=>{
                console.log(json)
                if (json.status_id=="1"||json.status_id=="2")
                {
                    setOutput("Processing. . . Please Wait")
                }
                else if (json.status_id=="3"||json.status_id=="4"||json.status_id=="5")
                {
                    console.log(json.stdout)
                    setOutput(json.stdout)
                    setLoading(false)
                }
                else if (json.status_id=="6"||json.status_id=="7"||json.status_id=="8"||json.status_id=="9"||json.status_id=="10"||json.status_id=="11")
                {
                    setOutput(json.stderr)
                    setLoading(false)
                }
                else
                {
                    setOutput(json.stderr)
                    setLoading(false)
                }
                
            })
            }, 1000)
            return()=>clearInterval(intervalx)
        }

        
    }, [loading])

    useEffect(()=>{
        setSocket(soc)
        return ()=>{
            if(socket) socket.disconnect()
        }
    }, [])

    //receiving changes from other perosn and saving on our editor

    useEffect(()=>
    { 
        if (socket==null || editor==null)
            return
       // console.log(editor.getValue())
        const handler=(changeObj)=>
        {
            console.log(changeObj)
            if (changeObj.text[0].length>2)
            {
                return 
            }
            editor.replaceRange(changeObj.text, changeObj.from, changeObj.to, "+move")
            setSrcDoc(`<html>
            <body>
                ${editor.getValue()}
                <style>
                    ${inputEditor.getValue()}
                </style>
                <script>
                    ${outputEditor.getValue()}
                </script>
            </body>
            </html>
            `)
            
        }
        socket.on('receive-changes', handler)


        return ()=>{
            socket.off('receive-changes', handler)
        }

    }, [socket, editor])
    useEffect(()=>
    { 
        if (socket==null || outputEditor==null)
            return
        const handler=(changeObj)=>{
            console.log(changeObj)
            if (changeObj.text[0].length>2){
                return 
            }
            outputEditor.replaceRange(changeObj.text, changeObj.from, changeObj.to, "+move")      
            setSrcDoc(`<html>
            <body>
                ${editor.getValue()}
                <style>
                    ${inputEditor.getValue()}
                </style>
                <script>
                    ${outputEditor.getValue()}
                </script>
            </body>
            </html>
            `)   
            
        }
        socket.on("receive-output-change",handler)

        return ()=>{
            socket.off('receive-output-change', handler)
        }

    }, [outputEditor])

    useEffect(()=>{
        if(socket==null || inputEditor==null)
            return
        
        const handler=(changeObj)=>{
            if(changeObj.text[0].length>2)
                return
            inputEditor.replaceRange(changeObj.text,changeObj.from,changeObj.to,"+move")
            setSrcDoc(`<html>
            <body>
                ${editor.getValue()}
                <style>
                    ${inputEditor.getValue()}
                </style>
                <script>
                    ${outputEditor.getValue()}
                </script>
            </body>
            </html>
            `)
        }

        socket.on("receive-input-change",handler)
        return ()=>{
            socket.off("receive-input-change",handler)
        }

    },[socket,inputEditor])

    //saving changes and broadcasting it to other user

    useEffect(()=>{
        if (editor==null || socket==null)
            return 
        
        const handler=(cmObj, changeObj)=>
        {
            if (socket==null || editor==null)
                return
            if (changeObj.origin==="+move")
                return
            console.log(changeObj)
            console.log(cmObj)
            socket.emit('send-changes', changeObj)
            setSrcDoc(`<html>
            <body>
                ${editor.getValue()}
                <style>
                    ${inputEditor.getValue()}
                </style>
                <script>
                    ${outputEditor.getValue()}
                </script>
            </body>
            </html>
            `)
        }
        editor.on('change', handler)

        return ()=>{
            editor.off('change', handler)
        }
    }, [socket, editor])

    useEffect(()=>{
        if (outputEditor==null || socket==null)
            return 
        
        const handler=(cmObj, changeObj)=>{
            if (socket==null || outputEditor==null)
                return
            if (changeObj.origin==="+move")
                return
            console.log(changeObj)
            console.log(cmObj)
            socket.emit('change-output', changeObj)
            setSrcDoc(`<html>
            <body>
                ${editor.getValue()}
                <style>
                    ${inputEditor.getValue()}
                </style>
                <script>
                    ${outputEditor.getValue()}
                </script>
            </body>
            </html>
            `)
        }
        outputEditor.on('change', handler)

        return ()=>{
            outputEditor.off('change', handler)
        }
    }, [outputEditor])

    useEffect(()=>{
        if(inputEditor==null || socket==null) return
        const handler=(cmobj,changeObj)=>{
            if(socket==null || inputEditor==null || changeObj.origin==="+move") return
            socket.emit("change-input",changeObj)
            setSrcDoc(`<html>
            <body>
                ${editor.getValue()}
                <style>
                    ${inputEditor.getValue()}
                </style>
                <script>
                    ${outputEditor.getValue()}
                </script>
            </body>
            </html>
            `)
        }
        inputEditor.on("change",handler)

        return ()=>{
            inputEditor.off("change",handler)
        }

    },[inputEditor])

    //making initial connection with socket io on the server side

    useEffect(() => {
        if (socket == null || editor == null) return
    
        socket.on("load-code", code => {
            console.log('Why is this running on here')
            editor.setValue(code)


        })
        socket.emit("get-code", id.id)
        

      }, [socket, editor, id])

    useEffect(() => {
        if (socket == null || outputEditor == null) return
    
        socket.emit("get-output",outputId)
        socket.on("load-output",data=>{
            outputEditor.setValue(data)
        })
        
      }, [socket, outputEditor, id])

    useEffect(() => {
        if (socket == null || inputEditor == null) return
 
        socket.emit("get-input",inputId)
        socket.on("load-input",data=>{
            inputEditor.setValue(data)
        })     

      }, [socket, inputEditor, id])
    

    //saving changes of all the editors
    useEffect(()=>{
        if (socket==null || editor==null)
            return 
        
        const interval=setInterval(()=>{
            
            socket.emit('save-code', editor.getValue())
        }, 2000)

        return () => {
            clearInterval(interval)
          }
    }, [socket, editor])

    useEffect(()=>{

        if(outputEditor==null)
        return
        socket.emit('output-change-on-run',output)
        outputEditor.setValue(output)

        socket.on("change-output-on-run",data=>{
            outputEditor.setValue(data)
        })
    },[socket,output])

    useEffect(()=>{
        if (socket==null || outputEditor==null)
            return 
        
        const interval=setInterval(()=>{
            socket.emit('save-output', outputEditor.getValue())
        }, 2000)

        return () => {
            clearInterval(interval)
          }
    }, [socket, outputEditor])

    useEffect(()=>{
        if(socket==null || inputEditor==null) return

        const interval = setInterval(()=>{
            socket.emit("save-input", inputEditor.getValue())
        }, 2000)
        return () => {
            clearInterval(interval)
        }
    },[socket,inputEditor])



    //Button logics
    const submitCode=(e)=>
    {
        const sourceCode=editor.getValue()
        const bodyData={
            language_id: langCode,
            source_code: sourceCode,
            stdin: inputEditor.getValue()
        }
        console.log(bodyData)
        fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&fields=*", {
	    "method": "POST",
	    "headers": {
            "content-type": "application/json",
            "x-rapidapi-key": "57a8c919cemsh60224f36e8adb22p1df733jsn6e408fcdbaf7",
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com"
        },
	    "body": JSON.stringify(bodyData)
})
.then(response=>response.json())
.then(json=>{
    console.log(json)
    setSubmissionCode(json.token)
    setLoading(true)
    console.log(loading)
})
    }
    const checkResult=()=>
    {
        fetch("https://judge0-ce.p.rapidapi.com/submissions/"+submissionCode+"?base64_encoded=false&fields=stdout,stderr,status_id,language_id", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "57a8c919cemsh60224f36e8adb22p1df733jsn6e408fcdbaf7",
		"x-rapidapi-host": "judge0-ce.p.rapidapi.com"
	}
    })
    .then((data)=>data.json())
    .then((json)=>{
        if (json.status_id==="1"||json.status_id==="2")
        {
            setOutput("Processing. . . Please Wait")
        }
        else if (json.status_id==="3"||json.status_id==="4"||json.status_id==="5")
        {
            setOutput(json.stdout)
            setLoading(false)
        }
        else if (json.status_id==="6"||json.status_id==="7"||json.status_id==="8"||json.status_id==="9"||json.status_id==="10"||json.status_id==="11")
        {
            setOutput(json.stderr)
            setLoading(false)
        }
        else
        {
            setOutput(json.stderr)
            setLoading(false)
        }
        
    })

    }

    const syncHandler=(e)=>
    {
        
    }

    const handleLanguageChange=(e)=>
    {
        console.log(e.target.value)
        setEditorLanguage(e.target.value.name)
        editor.setOption('mode', e.target.value.mode)
        setLangCode(e.target.value.id)

    }

    const handleThemeChange=(e) => {
        console.log(e.target.value)
        editor.setOption('theme', e.target.value)
        outputEditor.setOption('theme', e.target.value)
        inputEditor.setOption('theme', e.target.value)
    }

    const handleCompile=(e)=>{
        console.log(editor.getValue())
        setSrcDoc(`<html>
        <body>
            ${editor.getValue()}
            <style>
                ${inputEditor.getValue()}
            </style>
            <script>
                ${outputEditor.getValue()}
            </script>
        </body>
        </html>
        `)
    }


    return (
        <Container>
            <Grid container>
            
                <Grid xs={12} item >
                

                <FormControl>
                    <InputLabel className={classes.editorText}>Theme</InputLabel>
                    <Select
                    className={classes.langSelector}
                    defaultValue={editorLanguage}
                    onChange={handleThemeChange}
                    >
                    {EditorThemes.map((theme)=>(
                        <MenuItem className={classes.editorText} value={theme}>{theme}</MenuItem>
                    ))}
                    </Select>
                </FormControl>

                    <Button onClick={syncHandler} className={`${classes.syncButton} ${classes.editorText}`}><AllInclusiveIcon /> </Button>
                    
                    </Grid>
                
            </Grid>

            <Container>
                    <Grid  container sm={12} md={12} className={classes.editorWindow}>
                        <Grid item sm={12} md={4}>
                            <Typography variant="h6" className={classes.editorText}><span className={classes.htmlicon}><Build /></span> HTML:</Typography>
                            <div ref={editorRef}></div>
                        </Grid>
                        <Grid item sm={12} md={4}>
                            <Typography variant="h6" className={classes.editorText}><span className={classes.cssicon}><Brush /></span>CSS:</Typography>
                            <div ref={inputRef}></div>
                        </Grid>
                        <Grid item sm={12} md={4}>
                            <Typography variant="h6" className={classes.editorText}><span className={classes.jsicon}><Code /></span>JS:</Typography>
                            <div ref={outputRef}></div>
                        </Grid>
                        
                            
                        <Grid className={classes.iframe} item sm={12} md={12}>
                            <iframe 
                                title="output"
                                srcDoc={srcDoc}
                                sandbox="allow-scripts"
                                width="100%"
                                height="100%"
                            />
                        </Grid>
                    </Grid>

            
                   
            
            
            </Container>
            
        </Container>
        
    )
}
