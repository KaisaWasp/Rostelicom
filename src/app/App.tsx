import AppProviders from '@app/providers/AppProviders';
import UiKitPage from '@pages/market-radar/ui/UiKitPage';

const App = () => {
  return (
    <AppProviders>
      <UiKitPage />
    </AppProviders>
  );
};

export default App;
