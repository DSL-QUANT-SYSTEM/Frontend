export class StrategyCommonDTO {
    //공통
    initial_investment: number;
    tax: number;
    target_item: string;
    tick_kind: string;
    inq_range: number;
    strategy: string;

    constructor(data: {
        initial_investment: number;
        tax: number;
        target_item: string;
        tick_kind: string;
        inq_range: number;
        strategy: string;
    }) {
        this.initial_investment = data.initial_investment;
        this.tax = data.tax;
        this.target_item = data.target_item;
        this.tick_kind = data.tick_kind;
        this.inq_range = data.inq_range;
        this.strategy = data.strategy;
    }
}

export class StrategyGoldenDTO {
    //골든/데드
    fastMoveAvg: number;
    slowMoveAvg: number;

    constructor(data: { slowMoveAvg: number; fastMoveAvg: number }) {
        this.fastMoveAvg = data.fastMoveAvg;
        this.slowMoveAvg = data.slowMoveAvg;
    }
}

export class StrategyBollingerDTO {
    //볼린저
    moveAvg: number;

    constructor(data: { moveAvg: number }) {
        this.moveAvg = data.moveAvg;
    }
}

export class StrategyRsiDTO {
    //RSI,MFI,MACD
    rsiPeriod: number;

    constructor(data: { rsiPeriod: number }) {
        this.rsiPeriod = data.rsiPeriod;
    }
}

export class StrategyEnvDTO {
    moving_up: number;
    moving_down: number;
    movingAveragePeriod: number;

    constructor(data: { moving_up: number; moving_down: number; movingAveragePeriod: number }) {
        this.moving_up = data.moving_up;
        this.moving_down = data.moving_down;
        this.movingAveragePeriod = data.movingAveragePeriod;
    }
}

export class StrategyWDTO {
    //RSI,MFI,MACD
    williamsPeriod: number;

    constructor(data: { williamsPeriod: number }) {
        this.williamsPeriod = data.williamsPeriod;
    }
}
