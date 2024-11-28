export const deleteArticle = async (id) => {
    try {
        const response = await fetch(`http://localhost:4000/api/products/${id}`, {
            method: "DELETE"
        });

        if (response.status === 200) {
            alert("Article supprimé");
            window.location.href = "/";
        } else {
            alert("Erreur lors de la suppression de l'article");
        }
    } catch (error) {
        alert("Une erreur est survenue : " + error.message);
    }
};