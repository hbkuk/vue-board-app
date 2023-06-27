import {useFormRequest} from "@/composable/request/formRequest";

/**
 * Perform a form PUT request
 *
 * @param {string} url - API endpoint URL
 * @param {string} successRouterPath - Router path for navigation after success
 * @param {Object} formData - Data object for the request
 * @returns {object} - Error object or null
 */
export function usePutRequest(url, successRouterPath, formData) {
    return useFormRequest('put', url, successRouterPath, formData);
}