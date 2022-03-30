import React, { useState, useEffect } from "react";
import {
  SearchOutlined,
  Instagram,
  List,
  GraphicEq,
  Lock,
  StorageOutlined,
  Settings,
} from "@material-ui/icons";
import TastyQuestion from "./TastyQuestion";
import Tag from "./Tag";

export default function Jumbotron() {

  const webDev = [
      "AdoDotNET", 
"Android",
"Angular",
"AngularJS", 
"AspNET",
"AspNetMVC",
"AsNetTWebAPI", 
"CHash",
"CSS",
"DevOps", 
"EntityFramework",
"Flutter",
"Git", 
"Golang",
"GraphQL",
"HTML5", 
"Ionic",
"Java",
"JavaScript",  
"jQuery", 
"Kotlin",
"Laravel",
"LINQ", 
"MongoDB",
"DotNetCore",
"NodeJS", 
"OOP",
"PHP",
"PWA",
"Python", 
"React",
"ReactNative",
"ReactiveProgramming", 
"Redis",
"Redux",
"Ruby", 
"RubyOnRails",
"Testing",
"Spring",
"SQL",
"TSQL", 
"TypeScript",
"UXsDesign",
"VueJS",
"WCF", 
"WebSecurity",
"WebSockets",
"Xamarin", 
    ];


  const DSA = [
    "Arrays",
"Backtracking",
"BigO",
"BinaryTree",
"BitManipulation",
"Blockchain",
"DataStructures",
"DivideAndConquer",
"DynamicProgramming",
"FibonacciSequence",
"GraphTheory",
"GreedyAlgorithms",
"HashTables",
"HeapsAndMaps",
"LinkedLists",
"Queues",
"Recursion",
"Searching",
"Sorting",
"Stacks",
"Strings",
"Trees",
"Trie"
  ];

  const CoreCS = [
    "DBMS",
    "Networking", 
    "OS",
    "APIsDesign",
    "AvailabilityAndReliability",
    "Caching", 
    "CAPsTheorem",
    "Concurrency",
    "Cryptography",
    "Databases",
    "Docker",
    "LayeringAndMiddleware", 
    "LoadBalancing",
    "Microservices",
    "NoSQL",
    "ReactiveSystems",
    "SOA",
    "SoftwareArchitecture"
    ];
  const icons = [
    <SearchOutlined />,
    <Instagram />,
    <List />,
    <GraphicEq />,
    <Lock />,
    <StorageOutlined />,
    <Settings />,
  ];

  const [color, setColor] = useState({
    webDev: "text-blue-400",
    DSA: "",
    CoreCS: "",
  });
  const [category, setCategory] = useState(webDev);
  const [questionList, setQuestionList] = useState([]);
  const [categoryName, setCategoryName] = useState("webd");
  const [filter, setFilter] = useState("none");
  const handleColor = (choice) => {
    if (choice == "webDev") {
      setColor({
        webDev: "text-blue-400",
        DSA: "",
        CoreCS: "",
      });
      setCategory(webDev);
      setCategoryName("webd");
    } else if (choice == "DSA") {
      setColor({
        webDev: "",
        DSA: "text-blue-400",
        CoreCS: "",
      });
      setCategory(DSA);
      setCategoryName("DSA");
    } else if (choice == "CoreCS") {
      setColor({
        webDev: "",
        DSA: "",
        CoreCS: "text-blue-400",
      });
      setCategory(CoreCS);
      setCategoryName("corecs");
    }
  };

  const handleFilter = (filterOption) => {
    setFilter(filterOption);
  };
  /*
    const tagsRenderer=()=>
    {
        switch(category)
                    {
                        case 'webDev' :
                            webDev.map((topic)=><div>Hey</div>)
                            break;
                        case 'DSA':
                            DSA.map((topic)=><Tag name={topic}/>)
                            break;
                        case 'CoreCS':
                            CoreCS.map((topic)=><Tag name={topic}/>)
                            break;
                } 
    } */

  const handleTopic = (topic) => {
    console.log("Hey");
  };

  return (
    <div className="bg-white text-black rounded-xl p-1  mt-4 mb-4">
      <div className="bg-gray-200 rounded-xl p-4  ">
        <div className="grid grid-cols-3 gap-4 mt-10">
          <div
            className={`text-xl justify-self-center cursor-pointer ${color.webDev}`}
            onClick={() => handleColor("webDev")}
          >
            Web Dev
          </div>
          <div
            className={`text-xl justify-self-center cursor-pointer ${color.DSA}`}
            onClick={() => handleColor("DSA")}
          >
            Data Structures and Algorithms
          </div>
          <div
            className={`text-xl justify-self-center cursor-pointer ${color.CoreCS}`}
            onClick={() => handleColor("CoreCS")}
          >
            Core CS
          </div>
        </div>
        <div className="grid   mt-5 ">
          <div></div>
          <div className="  justify-self-center">
            {category.map((topic) => (
              <Tag
                icons={icons}
                setQuestionList={setQuestionList}
                category={categoryName}
                name={topic}
              />
            ))}
          </div>
          <div></div>
        </div>
      </div>
      <div className="ml-1 mr-1">
        <div>
          <button
            onClick={() => handleFilter("Junior")}
            className={`bg-white hover:bg-gray-100  text-gray-800 font-semibold m-1 px-4 border border-blue-400 rounded-full shadow sm:hidden lg:inline`}
          >
            Junior
          </button>
          <button
            onClick={() => handleFilter("Middle")}
            className={`bg-white hover:bg-gray-100  text-gray-800 font-semibold m-1 px-4 border border-green-400 rounded-full shadow sm:hidden lg:inline`}
          >
            Middle
          </button>
          <button
            onClick={() => handleFilter("Senior")}
            className={`bg-white hover:bg-gray-100  text-gray-800 font-semibold m-1 px-4 border border-red-400 rounded-full shadow sm:hidden lg:inline`}
          >
            Senior
          </button>
        </div>
        {questionList.map((question) => {
          if (filter == "none") {
            return (
              <TastyQuestion
                question={question.question}
                level={question.level}
              />
            );
          } else if (filter == "Junior") {
            if (question.level == "Junior") {
              return (
                <TastyQuestion
                  question={question.question}
                  level={question.level}
                />
              );
            }
          } else if (filter == "Middle") {
            if (question.level == "Middle") {
              return (
                <TastyQuestion
                  question={question.question}
                  level={question.level}
                />
              );
            }
          } else if (filter == "Senior") {
            if (question.level == "Senior") {
              return (
                <TastyQuestion
                  question={question.question}
                  level={question.level}
                />
              );
            }
          }
        })}
      </div>
    </div>
  );
}
