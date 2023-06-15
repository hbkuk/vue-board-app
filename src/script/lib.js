export default {
    // 현재 날짜를 가져오는 함수
    getCurrentDate() {
        return new Date().toISOString().slice(0, 10);
    },
    // 현재 날짜에서 일정 기간을 뺀 날짜를 계산하는 함수
    getPastDate(period) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - period);
        return startDate.toISOString().slice(0, 10);
    }
}