import { computed, ref, watch } from 'vue'

export function useSubmitForm(modifyViewData) {
    const board = ref(null) // 게시글 데이터
    const submitError = ref(null) // 제출 오류
    let formData = ref(new FormData()) // 폼 데이터

    /**
     * 파일 업로드를 처리하는 함수
     * @param {Event} event - 파일 업로드 이벤트
     */
    const handleFileUpload = (event) => {
        formData.value.delete('file')
        formData.value.append('file', ...event.target.files)
    }

    /**
     * 폼을 제출하는 함수
     */
    function getSubmitFormData() {
        formData.value.append('fileIdx', fileIndexes.value)
        formData.value.append('board', new Blob([JSON.stringify(board.value)], { type: 'application/json' }))
        return formData.value
    }

    /**
     * 파일 인덱스에 해당하는 파일을 삭제하는 함수
     * @param {number} fileIdx - 삭제할 파일의 인덱스
     */
    function deleteFileByFileIdx(fileIdx) {
        board.value.files = board.value.files.filter((file) => file.fileIdx !== fileIdx)
    }

    /**
     * 파일의 인덱스를 계산된 속성으로 반환하는 함수
     * @returns {number[]} 파일의 인덱스 배열
     */
    const fileIndexes = computed(() => {
        return board.value.files.map((file) => file.fileIdx)
    })

    /**
     * modifyBoardData 객체를 감시하고 값이 변경될 때마다 boardData와 fileData에 새로운 값을 할당하는 함수
     * @param {object} newModifyBoardData - 변경된 modifyBoardData 객체
     */
    watch(modifyViewData, (newModifyBoardData) => {
        board.value = newModifyBoardData.board
    })

    /**
     * submitError 변수를 감시하고 값이 변경될 때마다 formData를 초기화하는 함수
     * @param {object} newError - 변경된 submitError 객체
     */
    watch(submitError, (newError) => {
        formData.value = new FormData()
    })

    return {
        board,
        submitError,
        handleFileUpload,
        getSubmitFormData,
        deleteFileByFileIdx,
    }
}
