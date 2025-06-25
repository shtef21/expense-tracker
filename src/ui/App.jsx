// import viteLogo from '/vite.svg'

import { AppProviders } from "./AppProviders"
import { ChartContainer } from "./ChartContainer"

export const App = () => {
  return (
    <AppProviders>
      <ChartContainer />
    </AppProviders>
  )
}

export default App
