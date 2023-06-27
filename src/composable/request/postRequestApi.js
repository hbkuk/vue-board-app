import {useFormRequest} from "@/composable/request/formRequest";

/**
 * Perform a form POST request
 *
 * @param {string} url - API endpoint URL
 * @param {string} successRouterPath - Router path for navigation after success
 * @param {Object} formData - Data object for the request
 * @returns {object} - Error object or null
 */
export function usePostRequest(url, successRouterPath, formData) {
    return useFormRequest('post', url, successRouterPath, formData);
}