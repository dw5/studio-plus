// ==UserScript==
// @name        Better Vanillo - vanillo.tv
// @namespace   Violentmonkey Scripts
// @match       https://*.vanillo.tv/*
// @grant GM_xmlhttpRequest
// @version     0.1
// @author      dw5
// @description 6/27/2023, 15:03:50
// @run-at      document-idle
// ==/UserScript==

function vanilloPlus() {
  var htmlCode = `
                            <div id="hidevs" class="hidehidevs" style="width: 100%;padding-top: 70px;padding-left: 35vw;z-index: 1;position: fixed;color: #fff;backdrop-filter: blur(50px);background-color: #ff790014;transition: transform 0.3s ease;">
                              <tr>
                                <td><small id="hidevsall">[select all]</small> <b id="hidevscount">0</b> Selected videos </td>
                                <td>
                                  <div class="dropdown">
                                    <button class="dropdown-button">Edit</button>
                                    <div class="dropdown-content">
                                      <a>Video title</a>
                                      <a>Video description</a>
                                      <a>Video tags</a>
                                      <a>Video category</a>
                                      <a>Video Language</a>
                                      <div class="dropdown-submenu">
                                        <button class="dropbtn-submenu">Privacy</button>
                                        <div class="dropdown-submenu-content">
                                          <a id="jsxPrivate">🔒 Private</a>
                                          <a id="jsxUnlisted">🔓 Unlisted</a>
                                          <a id="jsxPublic">🌍 Public</a>
                                        </div>
                                      </div>
                                      <a id="jsxCopylink">🔗 Copy links</a>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div class="dropdown">
                                    <button class="dropdown-button">Add to playlist</button>
                                    <div class="dropdown-content">
                                      <a>Option 1</a>
                                      <a>Option 2</a>
                                      <a>Option 3</a>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div class="dropdown">
                                    <button class="dropdown-button" style="background-color: red;">Danger zone</button>
                                    <div class="dropdown-content">
                                      <a>======</a>
                                      <a>Download (Pro only)</a>
                                      <a>Delete</a>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </div>
  `;

  var table = document.querySelector('body');
  table.innerHTML += htmlCode;

  // Create a <style> element
  var styleElement = document.createElement('style');

  // Define your CSS rules
  var cssCode = `
.hidehidevs {
transform: translateY(-100%);
}
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  background-color: #efa05a;
  color: white;
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #202020cc;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  backdrop-filter: blur(50px);
  cursor: pointer;
}

.dropdown-content a {
  color: #fff;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-submenu {
  position: relative;
  padding: 12px 16px;
}

.dropdown-submenu-content {
  display: none;
  position: absolute;
  background-color: #202020cc;
  backdrop-filter: blur(50px);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  left: 100%;
  top: 0;
}

.dropdown-submenu:hover .dropdown-submenu-content {
  display: block;
}

div[class="w-full lg:w-1/5 pb-3 lg:pb-0 lg:pr-3 h-full"] {
margin-top: 28px !important;
}
  `;

  // Set the CSS code as the content of the <style> element
  styleElement.innerHTML = cssCode;

  // Append the <style> element to the <head> section of the document
  document.head.appendChild(styleElement);


  /*creatorboard*/

  document.getElementById('hidevsall').addEventListener('click', checkAllCheckboxes);

  var link = document.querySelector('a[href^="/v/"]');
  link.addEventListener('click', logCheckboxId);

        /*copylink*/ var jsxCopylink = document.getElementById('jsxCopylink');
        jsxCopylink.addEventListener("click", () => {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        var linkIds = [];

        checkboxes.forEach(function(checkbox) {
          if (checkbox.checked) {
            var closestRow = checkbox.closest('tr');
            if (closestRow) {
              var hrefElement = closestRow.querySelector('a[href^="/v/"]');
              if (hrefElement) {
                var id = hrefElement.getAttribute('href').split('/v/')[1];
                linkIds.push(id);
              }
            }
          }
        });

        var linkString = linkIds.map(function(id) {
          return "https://vnlo.tv/" + id+" ";
        }).join("\n");

        navigator.clipboard.writeText(linkString)
          .then(function() {
            console.log("Link IDs copied to clipboard: ", linkString);
          })
          .catch(function(error) {
            console.error("Failed to copy link IDs to clipboard: ", error);
          });
    }); // copylink

      /*jsxPrivate*/ var jsxPrivate = document.getElementById('jsxPrivate');
        jsxPrivate.addEventListener("click", () => {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        var linkIds = [];

        checkboxes.forEach(function(checkbox) {
          if (checkbox.checked) {
            var closestRow = checkbox.closest('tr');
            if (closestRow) {
              var hrefElement = closestRow.querySelector('a[href^="/v/"]');
              if (hrefElement) {
                var id = hrefElement.getAttribute('href').split('/v/')[1];
                linkIds.push(id);
              }
            }
          }
        });

  linkIds.forEach(function(id) {
    console.log("PRIVATE" + id);
  });

    }); // jsxPrivate

        /*jsxUnlisted*/ var jsxUnlisted = document.getElementById('jsxUnlisted');
        jsxUnlisted.addEventListener("click", () => {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        var linkIds = [];

        checkboxes.forEach(function(checkbox) {
          if (checkbox.checked) {
            var closestRow = checkbox.closest('tr');
            if (closestRow) {
              var hrefElement = closestRow.querySelector('a[href^="/v/"]');
              if (hrefElement) {
                var id = hrefElement.getAttribute('href').split('/v/')[1];
                linkIds.push(id);
              }
            }
          }
        });

  // @grant GM_xmlhttpRequest

linkIds.forEach(function(id) {
  console.log("unlisted: " + id);

  GM_xmlhttpRequest({
    method: "OPTIONS",
    url: "https://api.vanillo.tv/v1/videos/" + id,
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/114.0",
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site"
    },
    referrer: "https://vanillo.tv/",
    onload: function(response) {
      var headers = {};
      response.responseHeaders.split("\n").forEach(function(line) {
        var parts = line.split(":");
        if (parts.length === 2) {
          var name = parts[0].trim();
          var value = parts[1].trim();
          headers[name] = value;
        }
      });

      // Use the obtained headers for the PATCH request
      GM_xmlhttpRequest({
        method: "PATCH",
        url: "https://api.vanillo.tv/v1/videos/" + id,
        headers: {
          ...headers,
          "content-type": "application/json"
        },
        referrer: "https://vanillo.tv/",
        data: JSON.stringify({
          privacy: "unlisted"
        }),
        onload: function(response) {
          // Handle the response of the PATCH request
          console.log("Done?");
        },
        onerror: function(error) {
          console.error(error);
        }
      });
    },
    onerror: function(error) {
      console.error(error);
    }
  });
});


    });  // jsxUnlisted

          /*jsxPublic*/ var jsxUnlisted = document.getElementById('jsxPublic');
        jsxPublic.addEventListener("click", () => {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        var linkIds = [];

        checkboxes.forEach(function(checkbox) {
          if (checkbox.checked) {
            var closestRow = checkbox.closest('tr');
            if (closestRow) {
              var hrefElement = closestRow.querySelector('a[href^="/v/"]');
              if (hrefElement) {
                var id = hrefElement.getAttribute('href').split('/v/')[1];
                linkIds.push(id);
              }
            }
          }
        });

  linkIds.forEach(function(id) {

    console.log("public: " + id);

  });

    }); // jsxPublic


monitorCheckboxes();
updateHidevsAnimation()
}

function updateHidevsAnimation() {
  var hidevsCount = parseInt(document.getElementById('hidevscount').textContent);
  var hidevsElement = document.getElementById('hidevs');

  if (hidevsCount === 0) {
    hidevsElement.classList.add('hidehidevs');
  } else {
    hidevsElement.classList.remove('hidehidevs');
  }
}

function checkAllCheckboxes() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var countElement = document.getElementById('hidevscount');
  var checkedCount = document.querySelectorAll('input[type="checkbox"]:checked').length;

  if (checkedCount === checkboxes.length) {
    // Deselect all checkboxes if all selected
    checkboxes.forEach(function(checkbox) {
      checkbox.checked = false;

      // Toggle checkbox icon based on checked status
      var checkboxIcon = checkbox.parentElement.querySelector('i');
      if (checkboxIcon) {
        checkboxIcon.classList.remove('mdi-checkbox-marked');
        checkboxIcon.classList.add('mdi-checkbox-blank-outline');
      }
    });

    // Update video count to display none selected
    countElement.textContent = 0;
  } else {
    // Select all checkboxes if none selected or some selected
    checkboxes.forEach(function(checkbox) {
      checkbox.checked = true;

      // Toggle checkbox icon based on checked status
      var checkboxIcon = checkbox.parentElement.querySelector('i');
      if (checkboxIcon) {
        checkboxIcon.classList.remove('mdi-checkbox-blank-outline');
        checkboxIcon.classList.add('mdi-checkbox-marked');
      }
    });

    // Update video count to display all checkboxes
    countElement.textContent = checkboxes.length;
  }
}

function monitorCheckboxes() {
  // one by one
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var countElement = document.getElementById('hidevscount');

  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      // Update checkedCount based on the current checked status
      var checkedCount = document.querySelectorAll('input[type="checkbox"]:checked').length;

      // Update video count based on the checked count
      countElement.textContent = checkedCount;

      // Toggle checkbox icon based on checked status
      var checkboxIcon = this.parentElement.querySelector('i');
      if (checkboxIcon) {
        if (this.checked) {
          checkboxIcon.classList.remove('mdi-checkbox-blank-outline');
          checkboxIcon.classList.add('mdi-checkbox-marked');
        } else {
          checkboxIcon.classList.remove('mdi-checkbox-marked');
          checkboxIcon.classList.add('mdi-checkbox-blank-outline');
        }
      } updateHidevsAnimation();
    });
  });

  // Update video count initially
  //var checkedCount = document.querySelectorAll('input[type="checkbox"]:checked').length;
  //countElement.textContent = checkedCount;
}


function logCheckboxId(event) {
  event.preventDefault();
  var checkboxId = event.target.closest('tr').querySelector('input[type="checkbox"]').id;
  console.log(checkboxId);
}


function applyModifications() {

  if (window.location.pathname == "/creators/videos") {
  var table = document.querySelector('table'); //document.querySelector('table');
  if (table) {
    vanilloPlus();
  }
  } else { console.log("Creator PLUS: Alive, but wrong page");
    // If the table is not found, wait and try again
    //setTimeout(applyModifications, 5000);
  }

}

// Create a new MutationObserver instance
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' && mutation.target.nodeName === 'TITLE') {
      const newTitle = mutation.target.textContent.trim();
      const targetTitle = 'Creator Portal - Vanillo';

      if (newTitle === targetTitle) {
        applyModifications();
      }
    }
  });
});

// Start observing the document's <title> element
observer.observe(document.querySelector('title'), { subtree: true, childList: true });

// Apply modifications initially
applyModifications();
// Monitor changes to window.location.pathname using the popstate event
setTimeout(function() {
  window.addEventListener('popstate', applyModifications);
}, 5000);
