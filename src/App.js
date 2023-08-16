import React from "react";
import "./styles.css";

const timeout = (seconds) => {
  return new Promise(function (resolve, _) {
    setTimeout(resolve, seconds);
  });
};

const useMessage = (input) => {
  return `you entered ${input}`;
};

export default function App() {
  const [text, setText] = React.useState("");
  const message = useMessage(text);

  React.useEffect(() => {
    console.log("inside useeffect");
    let isCancelled = false;
    const changeHandler = async () => {
      console.log("inside changehandler");
      await timeout(1000).then(() => {
        if (!isCancelled) {
          alert(text);
          console.log({ message });
        }
      });
    };

    changeHandler();
    return () => {
      console.clear();
      console.log("inside return of useeffect", { isCancelled, text });
      isCancelled = true;
    };
  }, [text]);

  return (
    <div className="App">
      <input
        placeholder="Enter Text"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
