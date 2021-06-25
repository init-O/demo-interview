import React, {useEffect, useState, useRef} from 'react'

import {io} from 'socket.io-client'
import { useParams } from 'react-router-dom'

//Material UI imports 
import { Button, Container, Grid, Select, MenuItem, Input, MenuProps, FormControl, InputLabel, TextField, Box, Paper } from '@material-ui/core'
import { makeStyles, } from '@material-ui/core'
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';

//Codemirror imports  ->>DO NOT ALTER<<-
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/display/fullscreen.css'
//Languages Modes
import languageList from './data/languages.json'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/python/python'


//Linter features for select languages
import 'codemirror/addon/lint/javascript-lint'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/mode/css/css'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/display/fullscreen'

//Editor Themes
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/theme/blackboard.css'
import 'codemirror/theme/material-ocean.css'
import 'codemirror/theme/yeti.css'

//->>DO NOT ALTER<<- Altering import position breaks whole module
window.JSHINT = require('jshint').JSHINT;




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
        marginLeft:"20px"
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
    }

}))

export default function CodeEditor() {
    const classes=useStyles()
    const editorRef=useRef(null)
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
    const id=useParams()
  

    useEffect(()=>{
        if (editorRef==null)
            return 
        var myCodeMirror = CodeMirror(editorRef.current, {
            lineNumbers: true,
            mode: editorLanguage,
            lint: true,
            theme: editorTheme,
            gutters: ["CodeMirror-lint-markers"],
            fullscreen: true
        });
        setEditor(myCodeMirror)
        
        //console.log(editor)
    }, [])

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
        const soc=io("http://localhost:5000")
        setSocket(soc)
        return ()=>{
            socket.disconnect()
        }
    }, [])

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
            
            
        }
        socket.on('receive-changes', handler)

        return ()=>{
            socket.off('receive-changes', handler)
        }

    }, [socket, editor])

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
        }
        editor.on('change', handler)

        return ()=>{
            editor.off('change', handler)
        }
    }, [socket, editor])

    useEffect(() => {
        if (socket == null || editor == null) return
    
        socket.on("load-code", code => {
            console.log('Why is this running on here')
            editor.setValue(code)

        })
    
        socket.emit("get-code", id.id)
      }, [socket, editor, id])

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

    const submitCode=(e)=>
    {
        const sourceCode=editor.getValue()
        const bodyData={
            language_id: langCode,
            source_code: sourceCode,
            stdin: stdInput
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

    const handleInputChange=(e)=>
    {
        console.log(e.target.value)
        setStdInput(e.target.value)
    }

    return (
        <Container>
            <Grid container>
            
                <Grid xs={12} item>
                <FormControl>
                    <Select
                    className={classes.langSelector}
                    defaultValue={editorLanguage}
                    onChange={handleLanguageChange}
                    >
                    {languageList.map((language)=>(
                        <MenuItem value={language}>{language.name}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
                    <Button onClick={syncHandler} className={classes.syncButton}><AllInclusiveIcon /> </Button>
                    
                    </Grid>
                
            </Grid>

            <Container>
            
            <div ref={editorRef}>

            </div>
            
            <TextField
                onChange={handleInputChange}
                label="Input"
                className={classes.inputField}
                multiline
                rows={4}
                variant="outlined"
                />
            <Button className={classes.runButton} onClick={submitCode} variant="outlined" color="primary" >Run</Button>
            <Button className={classes.checkButton} variant="outlined" onClick={checkResult} color="secondary" >Check result</Button>
            
            <Grid container>
                <Grid sm={3} item></Grid>
                <Grid sm={6} className={output!==""?classes.outputFieldVisible:classes.outputFieldInvisible} item>
                    <Box>
                        <Paper className={classes.paperSurface}>
                            <p>
                                <b>Input:</b>
                                {stdInput}
                            </p>
                            <p>
                                <b>Output:</b>
                                <p>{output}</p>

                            </p>
                            
                        </Paper>
                    </Box>
                </Grid>
                <Grid sm={3} item></Grid>
            </Grid>
            </Container>
            
        </Container>
        
    )
}
