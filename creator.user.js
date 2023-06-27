// ==UserScript==
// @name        Better Vanillo - vanillo.tv
// @namespace   Violentmonkey Scripts
// @match       https://vanillo.tv/creators/videos
// @grant       none
// @version     0.1
// @author      dw5
// @description 6/27/2023, 15:03:50
// @run-at      document-idle
// ==/UserScript==

function vanilloPlus() {
  var htmlCode = `
                            <div id="hidevs" style="width: 100%;padding-top: 28px;padding-left: 35vw;z-index: 1;position: fixed;color: #fff;backdrop-filter: blur(50px);background-color: #ff790014;">
                              <tr>
                                <td class="align-middle">
                                  <div class="v-input v-input--horizontal v-input--density-default v-checkbox">
                                    <div class="v-input__control">
                                      <div class="v-selection-control v-selection-control--inline v-selection-control--density-default v-checkbox-btn">
                                        <div class="v-selection-control__wrapper">
                                          <div class="v-selection-control__input">
                                            <i class="mdi-checkbox-blank-outline mdi v-icon notranslate v-icon--size-default" aria-hidden="true"></i>
                                            <input id="checkbox-3" aria-disabled="false" type="checkbox" value="true" indeterminate="false" indeterminateicon="$checkboxIndeterminate" aria-describedby="checkbox-3-messages">
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="v-input__details"></div>
                                  </div>
                                </td>
                                <td><small id="hidevsall">[select all]</small> <b id="hidevscount">XX</b> Selected videos </td>
                                <td>
                                  <div class="dropdown">
                                    <button class="dropdown-button">Edit</button>
                                    <div class="dropdown-content">
                                      <a href="#">Video title</a>
                                      <a href="#">Video description</a>
                                      <a href="#">Video tags</a>
                                      <a href="#">Video category</a>
                                      <a href="#">Video Language</a>
                                      <a href="#">Privacy->Public</a>
                                      <a href="#">Privacy->Unlisted</a>
                                      <a href="#">Privacy->Private</a>
                                      <a href="#">Privacy->Gold</a>
                                      <a href="#">Copy links</a>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div class="dropdown">
                                    <button class="dropdown-button">Add to playlist</button>
                                    <div class="dropdown-content">
                                      <a href="#">Option 1</a>
                                      <a href="#">Option 2</a>
                                      <a href="#">Option 3</a>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div class="dropdown">
                                    <button class="dropdown-button" style="background-color: red;">Danger zone</button>
                                    <div class="dropdown-content">
                                      <a href="#">Delete</a>
                                      <a href="#">Download (Pro only)</a>
                                      <a href="#">Option 3</a>
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
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown:hover .dropdown-content {
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
}

function checkAllCheckboxes() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var countElement = document.getElementById('hidevscount');
  var isChecked = false;
  var checkedCount = 0;

  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      checkedCount++;
    }

    // Toggle checkbox based on the checked status of the first checkbox
    if (checkbox === checkboxes[0]) {
      checkbox.checked = !checkbox.checked;
    } else {
      checkbox.checked = checkboxes[0].checked;
    }

    // Log checkbox ID
    if (checkbox.checked) {
      var closestRow = checkbox.closest('tr');
      if (closestRow) {
        var hrefElement = closestRow.querySelector('a[href^="/v/"]');
        if (hrefElement) {
          var id = hrefElement.getAttribute('href').split('/v/')[1];
          console.log(id);
        }
      }
    }

    // Toggle checkbox icon based on checked status
    var checkboxIcon = checkbox.parentElement.querySelector('i');
    if (checkboxIcon) {
      if (checkbox.checked) {
        checkboxIcon.classList.remove('mdi-checkbox-blank-outline');
        checkboxIcon.classList.add('mdi-checkbox-marked');
        isChecked = true;
      } else {
        checkboxIcon.classList.remove('mdi-checkbox-marked');
        checkboxIcon.classList.add('mdi-checkbox-blank-outline');
      }
    }
  });

  // Update video count based on the checked count
  countElement.textContent = isChecked ? (checkboxes.length - checkedCount).toString() : '0';
}


function logCheckboxId(event) {
  event.preventDefault();
  var checkboxId = event.target.closest('tr').querySelector('input[type="checkbox"]').id;
  console.log(checkboxId);
}


function applyModifications() {
  var table = document.querySelector('table'); //document.querySelector('table');
  if (table) {
    vanilloPlus();
  } else {
    // If the table is not found, wait and try again
    setTimeout(applyModifications, 500);
  }
}

// Watch for changes in the DOM
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    // Check if the table is removed from the DOM
    if (mutation.removedNodes && mutation.removedNodes.length > 0) {
      for (var i = 0; i < mutation.removedNodes.length; i++) {
        var removedNode = mutation.removedNodes[i];
        if (removedNode.nodeName === 'TABLE') {
          // Apply modifications again
          applyModifications();
          break;
        }
      }
    }
  });
});

// Start observing changes in the DOM
observer.observe(document.body, { childList: true, subtree: true });

// Apply modifications initially
applyModifications();
