chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == 'pull') {
    let url = 'https://ncov.moh.gov.vn/';
    const options = {
      method: 'GET',
    };
    fetch(url, options)
      .then((response) => response.text())
      .then((data) => {
        sendResponse(data);
      });
    return true;
  }
});
