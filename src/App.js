import React from "react";
import "./styles.css";

const timeout = (seconds) => {
  return new Promise(function (resolve, _) {
    const timer = Math.random() * 1234567890;
    console.log(`inside promise timer value is = ${timer}`);
    setTimeout(() => resolve(timer), seconds);
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
    let isCancelled = false,
      res;
    const changeHandler = async () => {
      console.log("inside change handler");
      await timeout(1000).then((response) => {
        res = response;
        if (!isCancelled) {
          console.log({ message });
        }
      });
    };

    changeHandler();
    return () => {
      console.clear();
      console.log("inside return of cleaning", {
        isCancelled,
        text,
        "previous value: ": res,
      });
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
