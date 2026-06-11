export const calculateAge = (dob: string | null | undefined): string | null => {
  if (!dob) return null;

  const birthDate = new Date(dob);

  if (isNaN(birthDate.getTime())) {
    return null;
  }

  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();

  // Adjust if birthday hasn't occurred yet this month
  if (today.getDate() < birthDate.getDate()) {
    months--;
  }

  // Adjust negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years} years ${months} months`;
};
