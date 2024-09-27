//login, mypagecheck, mypage

export class UserInfoDTO {
    userName: string;
    userPhone: string;
    userBirthday: string;
    userGender: string;
    backtestRecords: any[];

    constructor(data: {
        userName: string;
        userPhone: string;
        userBirthday: string;
        userGender: string;
        backtestRecords: any[];
    }) {
        this.userName = data.userName;
        this.userPhone = data.userPhone;
        this.userBirthday = data.userBirthday;
        this.userGender = data.userGender;
        this.backtestRecords = data.backtestRecords;
    }

    setBirthDate(userBirthday: string) {
        this.userBirthday = userBirthday;
    }

    getBirthDate(): string {
        return this.userBirthday;
    }

    getUserInfo(): string {
        return `${this.userName} - ${this.userPhone} - ${this.userBirthday} - ${this.userGender} - ${JSON.stringify(
            this.backtestRecords,
        )}`;
    }
}
