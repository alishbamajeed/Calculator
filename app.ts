// app.ts

// Listen for the form submission
document.getElementById('resume-form')?.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    // Get user inputs
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const profilePic = (document.getElementById('profile-pic') as HTMLInputElement).files?.[0];
    const education = (document.getElementById('education') as HTMLInputElement).value;
    const work = (document.getElementById('work') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;
    const username = (document.getElementById('username') as HTMLInputElement).value;

    // Display the generated resume
    const outputImage = document.getElementById('output-image') as HTMLImageElement;

    if (profilePic) {
        const reader = new FileReader();
        reader.onload = function (e) {
            outputImage.src = e.target?.result as string;
        };
        reader.readAsDataURL(profilePic);
    }

    // Set the text for the output fields
    document.getElementById('output-name')!.innerText = name;
    document.getElementById('output-email')!.innerText = email;
    document.getElementById('output-education')!.innerText = education;
    document.getElementById('output-work')!.innerText = work;
    document.getElementById('output-skills')!.innerText = skills;

    // Show the generated resume
    document.getElementById('resume-output')!.style.display = 'block';

    // Enable sharing the link (example logic, customize as needed)
    const uniqueUrl = `${window.location.origin}/resume/${username}`;
    document.getElementById('resume-link')!.innerText = uniqueUrl;

    // Share link button functionality
    const shareButton = document.getElementById('share-link') as HTMLButtonElement;
    shareButton.onclick = () => {
        navigator.clipboard.writeText(uniqueUrl).then(() => {
            alert('Resume link copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    // Reset the form after submission
    (document.getElementById('resume-form') as HTMLFormElement).reset();
});

// Function to download the resume as a PDF
document.getElementById('download-pdf')?.addEventListener('click', () => {
    const element = document.getElementById('resume-output'); // The section you want to download
    if (element) {
        html2pdf()
            .from(element)
            .save('resume.pdf')
            .then(() => {
                console.log('PDF downloaded successfully.');
            })
            .catch((err) => {
                console.error('PDF download failed: ', err);
            });
    } else {
        console.error('Resume output element not found.');
    }
});
