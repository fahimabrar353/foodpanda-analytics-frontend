import "./RenderPage.css";
import CounterCard from "../Components/CounterCard";

function RenderPage() {
  return (
    <>
      <h1>Vite + React</h1>
      <CounterCard />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default RenderPage;
