// app.ts
var _a, _b;
// Listen for the form submission
(_a = document.getElementById('resume-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault(); // Prevent form submission
    // Get user inputs
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var profilePic = (_a = document.getElementById('profile-pic').files) === null || _a === void 0 ? void 0 : _a[0];
    var education = document.getElementById('education').value;
    var work = document.getElementById('work').value;
    var skills = document.getElementById('skills').value;
    var username = document.getElementById('username').value;
    // Display the generated resume
    var outputImage = document.getElementById('output-image');
    if (profilePic) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            outputImage.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        };
        reader.readAsDataURL(profilePic);
    }
    // Set the text for the output fields
    document.getElementById('output-name').innerText = name;
    document.getElementById('output-email').innerText = email;
    document.getElementById('output-education').innerText = education;
    document.getElementById('output-work').innerText = work;
    document.getElementById('output-skills').innerText = skills;
    // Show the generated resume
    document.getElementById('resume-output').style.display = 'block';
    // Enable sharing the link (example logic, customize as needed)
    var uniqueUrl = "".concat(window.location.origin, "/resume/").concat(username);
    document.getElementById('resume-link').innerText = uniqueUrl;
    // Share link button functionality
    var shareButton = document.getElementById('share-link');
    shareButton.onclick = function () {
        navigator.clipboard.writeText(uniqueUrl).then(function () {
            alert('Resume link copied to clipboard!');
        }).catch(function (err) {
            console.error('Failed to copy: ', err);
        });
    };
    // Reset the form after submission
    document.getElementById('resume-form').reset();
});
// Function to download the resume as a PDF
(_b = document.getElementById('download-pdf')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    var element = document.getElementById('resume-output'); // The section you want to download
    if (element) {
        html2pdf()
            .from(element)
            .save('resume.pdf')
            .then(function () {
            console.log('PDF downloaded successfully.');
        })
            .catch(function (err) {
            console.error('PDF download failed: ', err);
        });
    }
    else {
        console.error('Resume output element not found.');
    }
});
