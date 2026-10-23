import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '@app/layout/AppLayout';
import DealCalculatorPage from '@pages/deal-calculator';
import InvestmentNavigatorPage from '@pages/investment-navigator';
import MarketRadarPage from '@pages/market-radar';
import { APP_ROUTES } from '@shared/config/routes';
import PagePlaceholder from '@shared/ui/PagePlaceholder';

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={APP_ROUTES.dashboard} element={<PagePlaceholder title="Главная" />} />
        <Route path={APP_ROUTES.marketRadar} element={<MarketRadarPage />} />
        <Route path={APP_ROUTES.investmentNavigator} element={<InvestmentNavigatorPage />} />
        <Route path={APP_ROUTES.dealCalculator} element={<DealCalculatorPage />} />
      </Route>
      <Route path="*" element={<Navigate replace to={APP_ROUTES.dashboard} />} />
    </Routes>
  );
};

export default AppRouter;
