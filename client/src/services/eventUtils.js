export const getEventColors = (subject) => {
  const subjectColors = {
    UXUI: "#E6F3FF",
    OperatingSystems: "#FFCDFD",
    DevOps: "#FFEBEB",
    MobileApps: "#FFF5E8",
    Networking: "#FDFFAB",
    OOP: "#E6F8EB",
    Notes: "#E8E8E8",
  };

  const color = subjectColors[subject] || "#FFFFFF";
  return {
    backgroundColor: color,
    borderColor: color,
  };
};

/* export const getEventColors = (subject, opacity = 0.5) => {
  const subjectColors = {
    UXUI: "rgba(230, 243, 255, OPACITY)",
    OperatingSystems: "rgba(255, 205, 253, OPACITY)",
    DevOps: "rgba(255, 235, 235, OPACITY)",
    MobileApps: "rgba(255, 245, 232, OPACITY)",
    Networking: "rgba(253, 255, 171, OPACITY)",
    OOP: "rgba(230, 248, 235, OPACITY)",
    Notes: "rgba(232, 232, 232, OPACITY)",
  };

  const colorWithOpacity = (color) => {
    return color.replace("OPACITY", opacity);
  };

  const color = subjectColors[subject]
    ? colorWithOpacity(subjectColors[subject])
    : "rgba(255, 255, 255, OPACITY)".replace("OPACITY", opacity);

  return {
    backgroundColor: color,
    borderColor: color,
  };
}; */
