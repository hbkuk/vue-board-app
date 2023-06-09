<template>
    <div class="board">
        <table>
        <tr>
            <th width="3%">&nbsp;</th>
            <th width="10%">카테고리</th>
            <th width="3%">&nbsp;</th>
            <th width="5%">&nbsp;</th>
            <th>제목</th>
            <th width="10%">작성자</th>
            <th width="5%">조회수</th>
            <th width="12%">등록 일시</th>
            <th width="12%">수정 일시</th>
            <th width="3%">&nbsp;</th>
        </tr>
        <tr v-for="board in boardList" :key="board.boardIdx">
            <td width="3%">&nbsp;</td>
            <td width="10%">{{ board.category }}</td>
            <td width="3%">&nbsp;</td>
            <td width="5%">{{ board.hasFile ? 'OK' : 'NOTTING' }}</td>
            <td>
            <a :href="`/board?board_idx=${board.boardIdx}${searchConditionQueryString.isEmpty() ? '' : '&' + searchConditionQueryString}`">{{ truncateTitle(board.title) }}</a>
            </td>
            <td width="10%">{{ board.writer }}</td>
            <td width="5%">{{ board.hit }}</td>
            <td width="12%">{{ formatDate(board.regDate) }}</td>
            <td width="12%">{{ formatDate(board.modDate) }}</td>
            <td width="3%">&nbsp;</td>
        </tr>
        </table>
    </div>
</template>

<script>
export default {
}
</script>