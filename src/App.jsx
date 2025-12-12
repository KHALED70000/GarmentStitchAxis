import { useEffect, useState } from "react";

function App() {
  // Dark/Light mode state
  const [theme, setTheme] = useState("light");

  // Toggle function
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  // if(theme === 'dark'){
  //   document.documentElement.setAttribute('class', 'bg-black text-white')
  // }else if(theme === 'light'){
  //   document.documentElement.setAttribute('class', 'bg-white text-black')
  // }else{
  //   document.documentElement.setAttribute('class', 'bg-black text-white')
  // }

  useEffect(() => {
    document.documentElement.setAttribute(
      "class",
      theme === "dark" ? "bg-gray-950 text-white" : "bg-white text-black"
    );
  }, [theme]);


  // Conditional classes based on theme variable
  // const containerClass = theme === "light"
  //   ? "min-h-screen bg-white text-black"
  //   : "min-h-screen bg-gray-900 text-white";

  // const headingClass = theme === "light"
  //   ? "text-blue-700"
  //   : "text-yellow-400";

  // const buttonClass = theme === "light"
  //   ? "px-4 py-2 bg-blue-500 text-white rounded"
  //   : "px-4 py-2 bg-yellow-500 text-black rounded";

  return (
    <div className={`containerClass ${theme === 'dark' ? 'text-white' : "text-black"}`}>
      <h1 className={`headingClass`}>Vite + React Theme Toggle</h1>
      <button onClick={toggleTheme} className={`buttonClass ${theme === 'dark' ? 'bg-black text-white' : "bg-white text-black"} btn`}>
        Toggle Theme
      </button>
      <p>Current theme: {theme}</p>
    </div>
  );
}

export default App;
