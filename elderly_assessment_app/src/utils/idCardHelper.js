export function extractInfoFromIdCard(idNumber) {
  if (typeof idNumber !== 'string' || idNumber.length !== 18) {
    return null;
  }

  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const checksumChars = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  let sum = 0;

  for (let i = 0; i < 17; i++) {
    const digit = parseInt(idNumber[i], 10);
    if (isNaN(digit)) { // Check if the digit is a number
        return null;
    }
    sum += digit * weights[i];
  }

  const remainder = sum % 11;
  const expectedChecksum = checksumChars[remainder];
  const actualChecksum = idNumber[17].toUpperCase(); // Handle 'x'

  if (expectedChecksum !== actualChecksum) {
    return null;
  }

  // Information Extraction
  const year = idNumber.substring(6, 10);
  const month = idNumber.substring(10, 12);
  const day = idNumber.substring(12, 14);
  const dateOfBirth = `${year}-${month}-${day}`;

  // Validate date (basic check for now, can be enhanced)
  const dobDate = new Date(dateOfBirth);
  if (isNaN(dobDate.getTime()) || 
      dobDate.getFullYear() !== parseInt(year) ||
      dobDate.getMonth() + 1 !== parseInt(month) ||
      dobDate.getDate() !== parseInt(day)) {
    return null; // Invalid date components
  }

  const genderDigit = parseInt(idNumber[16], 10);
  const gender = genderDigit % 2 === 0 ? '女' : '男';

  // Calculate Age
  const today = new Date();
  let age = today.getFullYear() - dobDate.getFullYear();
  const m = today.getMonth() - dobDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
    age--;
  }

  return {
    dateOfBirth,
    gender,
    age,
  };
}
