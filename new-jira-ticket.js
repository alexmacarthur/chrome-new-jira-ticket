class NewJiraTicket {
    constructor() {
        if (!window.location.hostname.includes('atlassian')) {
            return;
        }        

        this.listenForNewIssueDialog();
    }
    
    listenForNewIssueDialog() {
        const observer = new MutationObserver((mutations) => {
            const mutationsOfInterest = mutations.filter(m => m.type === "childList");
            const createIssueDialog = mutationsOfInterest.find(m => m.target.id === "create-issue-dialog");
            const textarea = createIssueDialog?.target.querySelector('textarea[name="description"]');

            if (!createIssueDialog || !textarea) {
                return;
            }

            this.setTextareaContent(textarea);
        });

        observer.observe(document.body, { subtree: true, childList: true });
    }

    setTextareaContent(textarea) {
        textarea.value = `Put a description here.

h2. Pipeline
To come!

h2. Testing Steps
* 
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NewJiraTicket();
});
