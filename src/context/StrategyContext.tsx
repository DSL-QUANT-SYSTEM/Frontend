// 전략 설정 관련 Context

import React, { createContext, useState, useContext } from 'react';
import {
    StrategyCommonDTO,
    StrategyGoldenDTO,
    StrategyBollingerDTO,
    StrategyRsiDTO,
    StrategyEnvDTO,
    StrategyWDTO,
} from '../types/StrategyDTO';
import { ResultDTO } from '../types/ResultDTO';

// 초기 상태값
const initialStrategyCommonData: StrategyCommonDTO = {
    initial_investment: 0,
    tax: 0.01,
    target_item: '',
    tick_kind: '',
    inq_range: 100,
    strategy: '',
};

const initialStrategy1Data: StrategyGoldenDTO = {
    fastMoveAvg: 0,
    slowMoveAvg: 0,
};

const initialStrategy2Data: StrategyBollingerDTO = {
    moveAvg: 0,
};

const initialStrategy3Data: StrategyRsiDTO = {
    rsiPeriod: 0,
};

const initialStrategy4Data: StrategyEnvDTO = {
    moving_up: 0,
    moving_down: 0,
    movingAveragePeriod: 0,
};

const initialStrategy5Data: StrategyWDTO = {
    williamsPeriod: 0,
};

const initialResultData: ResultDTO = {
    finalCash: 0,
    finalAsset: 0,
    finalBalance: 0,
    profit: 0,
    profitRate: 0,
    numberOfTrades: 0,
};

// Context 생성
export const StrategyContext = createContext<{
    strategyCommonData: StrategyCommonDTO;
    setStrategyCommonData: React.Dispatch<React.SetStateAction<StrategyCommonDTO>>;
    strategy1Data: StrategyGoldenDTO;
    setStrategy1Data: React.Dispatch<React.SetStateAction<StrategyGoldenDTO>>;
    strategy2Data: StrategyBollingerDTO;
    setStrategy2Data: React.Dispatch<React.SetStateAction<StrategyBollingerDTO>>;
    strategy3Data: StrategyRsiDTO;
    setStrategy3Data: React.Dispatch<React.SetStateAction<StrategyRsiDTO>>;
    strategy4Data: StrategyEnvDTO;
    setStrategy4Data: React.Dispatch<React.SetStateAction<StrategyEnvDTO>>;
    strategy5Data: StrategyWDTO;
    setStrategy5Data: React.Dispatch<React.SetStateAction<StrategyWDTO>>;
    resultData: ResultDTO;
    setResultData: React.Dispatch<React.SetStateAction<ResultDTO>>;
}>({
    strategyCommonData: initialStrategyCommonData,
    setStrategyCommonData: () => {},
    strategy1Data: initialStrategy1Data,
    setStrategy1Data: () => {},
    strategy2Data: initialStrategy2Data,
    setStrategy2Data: () => {},
    strategy3Data: initialStrategy3Data,
    setStrategy3Data: () => {},
    strategy4Data: initialStrategy4Data,
    setStrategy4Data: () => {},
    strategy5Data: initialStrategy5Data,
    setStrategy5Data: () => {},
    resultData: initialResultData,
    setResultData: () => {},
});

// Context Provider
// @ts-ignore
export const StrategyProvider: React.FC = ({ children }) => {
    const [strategyCommonData, setStrategyCommonData] =
        useState<StrategyCommonDTO>(initialStrategyCommonData);
    const [strategy1Data, setStrategy1Data] = useState<StrategyGoldenDTO>(initialStrategy1Data);
    const [strategy2Data, setStrategy2Data] = useState<StrategyBollingerDTO>(initialStrategy2Data);
    const [strategy3Data, setStrategy3Data] = useState<StrategyRsiDTO>(initialStrategy3Data);
    const [strategy4Data, setStrategy4Data] = useState<StrategyEnvDTO>(initialStrategy4Data);
    const [strategy5Data, setStrategy5Data] = useState<StrategyWDTO>(initialStrategy5Data);
    const [resultData, setResultData] = useState<ResultDTO>(initialResultData);

    return (
        <StrategyContext.Provider
            value={{
                strategyCommonData,
                setStrategyCommonData,
                strategy1Data,
                setStrategy1Data,
                strategy2Data,
                setStrategy2Data,
                strategy3Data,
                setStrategy3Data,
                strategy4Data,
                setStrategy4Data,
                strategy5Data,
                setStrategy5Data,
                resultData,
                setResultData,
            }}
        >
            {children}
        </StrategyContext.Provider>
    );
};

// Custom Hook
export const useStrategy = () => {
    const context = useContext(StrategyContext);
    if (!context) {
        throw new Error('useStrategy must be used within a StrategyProvider');
    }
    return context;
};
