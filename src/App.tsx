import "./App.css";
import {use, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

type FileName = "index.html" | "style.css" | "script.js";

function App() {
  const [activeFile, setActiveFile] = useState<FileName>("index.html")
  const [renderedCode, setRenderedCode] = useState<string>("");



  
  const [files, setFiles] = useState<Record<FileName, string>>({
      "index.html": "<h1>Hello World!</h1>",
      "style.css": "h1 { color: purple; }",
      "script.js": "console.log('Hello!');",
    });


  useEffect(() => {
    const savedCode = JSON.stringify(files)
    localStorage.setItem("code", savedCode)
    
  },[files])

  useEffect(() => {
    localStorage.getItem("code");
  },[])




    function updateCode(newCode: string) {
      const updatedFiles = { ...files };

      updatedFiles[activeFile] = newCode;

      setFiles(updatedFiles);
    }

    function getLanguage() {
      if (activeFile == "index.html"){
        return "html";
      }
      else if (activeFile == "style.css"){
        return "css";
      }
      else{
        return "javascript";
      }
    }



    const previewCode = `
      <style>
        ${files["style.css"]}
      </style>

      ${files["index.html"]}
      
      <script>
        ${files["script.js"]}
      </script>
    `

    
  return (
    <div className="app">
      
      <header className="toolbar">
        <h2>CodeNest</h2>
        <button onClick={() => setRenderedCode(previewCode)}>
        Run Code</button>
      </header>

      <main className="workspace">

        <aside className="sidebar-container">
          <section className="sidebar">
            <h3>Files</h3>

            {Object.keys(files).map((file) => (
              <button
                key={file}
                className={activeFile === file ? "file-active file" : "file"}
                onClick={() => setActiveFile(file as FileName)}
              >
                {file}
              </button>
            ))}
          </section>
          
        </aside>
        <section className="editor">
          <h3>{activeFile}</h3>
            <Editor
              language={getLanguage()}
              height="80%"
              theme="vs-dark"
              value={files[activeFile]}
              onChange={(value) => updateCode(value ?? "")}
            />
            <button className="reset" onClick={() => updateCode("")}>
              reset
            </button>
          </section>

        <section className="preview-container">

          <section className="preview">
          <iframe
            title="CodeNest Preview"
            srcDoc={renderedCode}
            sandbox="allow-scripts"
          />

          </section>
        </section>
        
      </main>

    </div>
  );
}

export default App;