

document.addEventListener('DOMContentLoaded', () => {
    const postIdInput = document.getElementById('postIdInput');
    const textContentTextarea = document.getElementById('textContentTextarea');
    const analysisResultDiv = document.getElementById('analysisResultDiv');

    window.handleCreatePost = async () => {
        const postId = postIdInput.value;
        const textContent = textContentTextarea.value;

        try {
            const response = await fetch('http://localhost:3001/api/v1/posts', {
                method: 'POST',
                body: JSON.stringify({
                    id: postId,
                    textContent
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();

            alert('Post created successfully!');
            console.log('Created Post:', data);
        } catch (error) {
            alert('Failed to create post');
            console.error('Error creating post:', error);
        }
    };

    window.handleGetAnalysis = async () => {
        const postId = postIdInput.value;

        try {
            const response = await fetch(`http://localhost:3001/api/v1/posts/${postId}/analysis`);
            const data = await response.json();

            setAnalysisResult(data);
            console.log('Analysis Result:', data);
        } catch (error) {
            alert('Failed to get analysis');
            console.error('Error getting analysis:', error);
        }
    };

    function setAnalysisResult(result) {
        analysisResultDiv.innerHTML = `<h2>Analysis Result</h2>
      <p>Word Count: ${result.wordCount}</p>
      <p>Average Word Length: ${result.averageWordLength}</p>`;
    }
});

