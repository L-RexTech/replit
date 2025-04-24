import { Route, Switch } from "wouter";
import Analyzer from "@/pages/Analyzer";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <Switch>
      <Route path="/" component={Analyzer} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
