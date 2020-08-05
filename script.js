window.onkeydown = function (e) {
  if (e.keyCode === 27) {
    window.close();
  }
};
const strip = (html) => {
  var doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body || '';
};

const numberWithCommas = (x) => {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, '$1,$2');
  return x;
};

document.addEventListener('DOMContentLoaded', () => {
  chrome.extension.sendMessage({ action: 'pull' }, (data) => {
    const ncovDoc = strip(data);
    const ncovVietNamNode = ncovDoc.getElementsByClassName('box-tke')[0]
      .childNodes[1].childNodes;
    const ncovGlobalNode = ncovDoc.getElementsByClassName('box-tke')[0]
      .childNodes[4].childNodes;

    const soCaNhiem = ncovVietNamNode[3].innerText.replace(/\D+/g, '');
    const dangDieuTri = ncovVietNamNode[5].innerText.replace(/\D+/g, '');
    const khoiBenh = ncovVietNamNode[7].innerText.replace(/\D+/g, '');
    const tuVong = ncovVietNamNode[9].innerText.replace(/\D+/g, '');

    const soCaNhiemGlobal = ncovGlobalNode[3].innerText.replace(/\D+/g, '');
    const dangDieuTriGlobal = ncovGlobalNode[9].innerText.replace(/\D+/g, '');
    const khoiBenhGlobal = ncovGlobalNode[5].innerText.replace(/\D+/g, '');
    const tuVongGlobal = ncovGlobalNode[7].innerText.replace(/\D+/g, '');

    // document.getElementsByClassName('covid_virus_update')[0].innerHTML = formatDateTime(data.data.updated_at);
    //vietnam
    document.getElementsByClassName('covid_cases')[0].innerHTML =
      numberWithCommas(soCaNhiem) || '';
    document.getElementsByClassName('covid_deaths')[0].innerHTML =
      numberWithCommas(tuVong) || '';
    document.getElementsByClassName('covid_critical')[0].innerHTML =
      numberWithCommas(dangDieuTri) || '';
    document.getElementsByClassName('covid_recovered')[0].innerHTML =
      numberWithCommas(khoiBenh) || '';
    //global
    document.getElementsByClassName('covid_cases')[1].innerHTML =
      numberWithCommas(soCaNhiemGlobal) || '';
    document.getElementsByClassName('covid_deaths')[1].innerHTML =
      numberWithCommas(dangDieuTriGlobal) || '';
    document.getElementsByClassName('covid_critical')[1].innerHTML =
      numberWithCommas(khoiBenhGlobal) || '';
    document.getElementsByClassName('covid_recovered')[1].innerHTML =
      numberWithCommas(tuVongGlobal) || '';
  });
});
