const getStudyTypes = (artists) => {
    const studies = artists.map(a => a.estudos);
    const singleArray = studies.flat();
    const types = singleArray.map(a => a?.area && a.area).filter(a => a != null);

    return [...new Set(types)];
};

module.exports = { getStudyTypes };