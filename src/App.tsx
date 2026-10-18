import "./App.css";
import React, {useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

type FileName = "index.html" | "style.css" | "script.js";

function App() {
  const [activeFile, setActiveFile] = useState<FileName>("index.html")
  const [renderedCode, setRenderedCode] = useState<string>("");

  
  const [files, setFiles] = useState<Record<FileName, string>>(() => {
  const savedCode = localStorage.getItem("code");

  if (savedCode) {
    try {
      return JSON.parse(savedCode);
    } catch {
      console.error("Failed to load saved code");
    }
  }

  return {
    "index.html": "<h1>Hello World!</h1>",
    "style.css": "h1 { color: purple; }",
    "script.js": "console.log('Hello!');",
  };
});


  useEffect(() => {
    localStorage.setItem("code", JSON.stringify(files))
    
  },[files])

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


    function confirmReset() {
      if(confirm("Are you sure you want to reset?")){
        updateCode("")
      }
    }

    function handleRunCode() {
    setRenderedCode(previewCode);
  }

  const handleRunKey = (event: React.KeyboardEvent) => {
    if((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "r"){
      event.preventDefault()
      handleRunCode()
    }
  }

    function DownloadStaticFile(){
      const blob = new Blob([previewCode], {type: "text/html"})
      const url = URL.createObjectURL(blob)

      const element = document.createElement("a");
      element.href = url;
      element.download = "codenest-project.html"

      document.body.appendChild(element);
    element.click();
    
    document.body.removeChild(element);
    URL.revokeObjectURL(url);
    }



    

    
  return (
    <div className="app" onKeyDown={handleRunKey}>
      
      <header className="toolbar">
        <h2>CodeNest</h2>
        <button onClick={() => handleRunCode()}>
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
            <button className="reset" onClick={() => confirmReset()}>
              reset
            </button>
            <button onClick={ () => DownloadStaticFile()}>download code</button>
          </section>

        <section className="preview-container">
          <div className="preview-container-item">
            <section className="preview ">
              <iframe
                title="CodeNest Preview"
                srcDoc={renderedCode}
                sandbox="allow-scripts"
              />
            </section>
          </div>

          <div className="preview-container-item">
            <section >
              <h1>Console goes here</h1>
            </section>
          </div>

          </section>
        
      </main>

    </div>
  );
}

export default App;