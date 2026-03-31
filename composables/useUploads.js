export function useUploads() {
  async function createSignedUpload(file) {
    return {
      fileName: file?.name || 'record.pdf',
      uploadUrl: '/api/uploads/sign'
    }
  }

  return {
    createSignedUpload
  }
}
