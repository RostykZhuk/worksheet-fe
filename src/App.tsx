import { Header } from "./ui-components/Header";
import { MainContent } from "./ui-components/MainContent/MainContent";
import { Preloader } from "./ui-components/Preloader";
import { WorksheetTasksData } from "./utils/DAL/api";
import { useAppState } from "./utils/useAppState";

function App() {
  const { tasks, loading, errorMessage }: {tasks: WorksheetTasksData, loading: boolean, errorMessage: string} = useAppState();

  return (
    <>
      <Header />
      {errorMessage ? <p>Sorry, unfortunetly we have error. {errorMessage}</p>:
      loading ? <Preloader /> : <MainContent tasks={tasks} />
}
    </>
  );
}

export default App;
