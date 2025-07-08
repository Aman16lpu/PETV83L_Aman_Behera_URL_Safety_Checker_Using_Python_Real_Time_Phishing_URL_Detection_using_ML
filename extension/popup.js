document.addEventListener("DOMContentLoaded", function () {
  const urlElement = document.getElementById("url");
  const checkButton = document.getElementById("check");
  const resultElement = document.getElementById("result");

  // Get active tab URL
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url;
    urlElement.textContent = url;

    checkButton.onclick = function () {
      const features = extractFeatures(url);
      fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(features),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            resultElement.textContent = "❌ Error: " + data.error;
          } else {
            resultElement.textContent = data.message;
          }
        })
        .catch((err) => {
          resultElement.textContent = "❌ Server Error";
          console.error(err);
        });
    };
  });
});

// 🔍 Extract features based on your trained model
function extractFeatures(url) {
  const parser = document.createElement("a");
  parser.href = url;

  const hostname = parser.hostname || "";
  const path = parser.pathname || "";
  const query = parser.search || "";

  return {
    NumDots: (url.match(/\./g) || []).length,
    SubdomainLevel: (hostname.match(/\./g) || []).length - 1,
    PathLevel: (path.match(/\//g) || []).length,
    UrlLength: url.length,
    NumDash: (url.match(/-/g) || []).length,
    NumDashInHostname: (hostname.match(/-/g) || []).length,
    AtSymbol: url.includes("@") ? 1 : 0,
    TildeSymbol: url.includes("~") ? 1 : 0,
    NumUnderscore: (url.match(/_/g) || []).length,
    NumPercent: (url.match(/%/g) || []).length,
    NumQueryComponents: (query.match(/=/g) || []).length,
    NumAmpersand: (query.match(/&/g) || []).length,
    NumHash: (url.match(/#/g) || []).length,
    NumNumericChars: (url.match(/[0-9]/g) || []).length,
    NoHttps: url.startsWith("https") ? 0 : 1,
    RandomString: /[a-z]{15,}/.test(hostname) ? 1 : 0,
    IpAddress: /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname) ? 1 : 0,
    DomainInSubdomains: 0,
    DomainInPaths: 0,
    HttpsInHostname: hostname.includes("https") ? 1 : 0,
    HostnameLength: hostname.length,
    PathLength: path.length,
    QueryLength: query.length,
    DoubleSlashInPath: path.includes("//") ? 1 : 0,
    NumSensitiveWords: (url.match(/login|secure|account|update|bank/gi) || []).length,
    EmbeddedBrandName: 0,
    PctExtHyperlinks: 0.5,
    PctExtResourceUrls: 0.5,
    ExtFavicon: 1,
    InsecureForms: 1,
    RelativeFormAction: 0,
    ExtFormAction: 1,
    AbnormalFormAction: 1,
    PctNullSelfRedirectHyperlinks: 0.5,
    FrequentDomainNameMismatch: 0,
    FakeLinkInStatusBar: 0,
    RightClickDisabled: 0,
    PopUpWindow: 0,
    SubmitInfoToEmail: 0,
    IframeOrFrame: 0,
    MissingTitle: 1,
    ImagesOnlyInForm: 0,
    SubdomainLevelRT: 1,
    UrlLengthRT: 1,
    PctExtResourceUrlsRT: 1,
    AbnormalExtFormActionR: 1,
    ExtMetaScriptLinkRT: 1,
    PctExtNullSelfRedirectHyperlinksRT: 1,
  };
}
