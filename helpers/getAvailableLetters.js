const getAvailableLetters = (artists) => {
    const allLetters = artists?.map(artist => (
        artist.nome.charAt(0)
    ));

    return [...new Set(allLetters)];
}

module.exports = { getAvailableLetters }