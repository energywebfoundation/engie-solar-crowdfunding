const date = require('date-and-time');

export const DateHandler = () => {
    let dateTimestamp;
    const defaultDate = new Date(Date.now() + 10000);
    const add = (amount: Number, type: string, baseDate = defaultDate) => {
        switch (type){
            case 'months':
                dateTimestamp = Date.parse(date.addMonths(baseDate, amount));
                return dateTimestamp / 1000;
            case 'days':
                dateTimestamp = Date.parse(date.addDays(baseDate, amount));
                return dateTimestamp / 1000;
            case 'years':
                dateTimestamp = Date.parse(date.addYears(baseDate, amount));
                console.log('year calculate: Default date >>>> ', baseDate, dateTimestamp);

                return dateTimestamp / 1000;
            case 'hours':
                 dateTimestamp = Date.parse(date.addHours(baseDate, amount));
                return dateTimestamp / 1000;
            case 'minutes':
                dateTimestamp = Date.parse(date.addMinutes(baseDate, amount));
                return dateTimestamp / 1000;
            case 'seconds':
                dateTimestamp = Date.parse(date.addSeconds(baseDate, amount));
                return dateTimestamp / 1000;
            case 'milliseconds':
                dateTimestamp = Date.parse(date.addMilliseconds(baseDate, amount));
                return dateTimestamp / 1000;
            default:
                return new Error(`Addition is not possible on ${type}`);
        }
    }

    const now = async () => {
        const currentDate : Date = new Date(Date.now());

        return (Date.parse(currentDate.toDateString()) / 1000);
    }
    return {
        add,
        now
    }
}