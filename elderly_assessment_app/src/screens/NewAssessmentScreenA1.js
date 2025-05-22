import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, Platform, Alert } from 'react-native';
import { extractInfoFromIdCard } from '../../utils/idCardHelper';

const NewAssessmentScreenA1 = () => {
  // Module 1 States
  const [assessorName, setAssessorName] = useState('');
  const [customId, setCustomId] = useState('');
  const [idCardNumber, setIdCardNumber] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');

  // Module 2 States
  const [nationality, setNationality] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [deathDate, setDeathDate] = useState('');

  // Module 3 States
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [nativePlace, setNativePlace] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [informationProvider, setInformationProvider] = useState('');

  const handleSave = () => {
    console.log({
      assessorName,
      customId,
      idCardNumber,
      age,
      dob,
      gender,
      nationality,
      admissionDate,
      dischargeDate,
      deathDate,
      height,
      weight,
      ethnicity,
      nativePlace,
      detailedAddress,
      emergencyContactName,
      emergencyContactPhone,
      informationProvider,
    });
    // Further actions like saving to storage or API call would go here
  };

  const handleIdCardChange = (text) => {
    setIdCardNumber(text);
    const info = extractInfoFromIdCard(text);
    if (info) {
      setAge(info.age.toString());
      setDob(info.dateOfBirth);
      setGender(info.gender);
    } else {
      setAge('---');
      setDob('---');
      setGender('---');
      if (text.length === 18) { // Only show alert if it's an 18-digit attempt
        Alert.alert('无效身份证', '身份证号码格式不正确或校验失败。');
      }
    }
  };

  return (
    <ScrollView style={styles.screenContainer}>
      <Text style={styles.screenTitle}>新增评估 - A1 基本信息</Text>

      {/* Module 1: Assessor and ID Information */}
      <View style={styles.moduleContainer}>
        <Text style={styles.moduleTitle}>评估人员及身份信息</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>评估人员姓名</Text>
          <TextInput style={styles.input} value={assessorName} onChangeText={setAssessorName} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>自定义编号 (Max 18)</Text>
          <TextInput style={styles.input} value={customId} onChangeText={setCustomId} maxLength={18} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>身份证号码</Text>
          <TextInput style={styles.input} value={idCardNumber} onChangeText={handleIdCardChange} maxLength={18} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>年龄</Text>
          <Text style={styles.displayInput}>{age || '---'}</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>出生年月日</Text>
          <Text style={styles.displayInput}>{dob || '---'}</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>性别</Text>
          <Text style={styles.displayInput}>{gender || '---'}</Text>
        </View>
      </View>

      {/* Module 2: Dates and Nationality */}
      <View style={styles.moduleContainer}>
        <Text style={styles.moduleTitle}>日期与国籍</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>国籍</Text>
          <TextInput style={styles.input} value={nationality} onChangeText={setNationality} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>入住时间 (YYYY-MM-DD)</Text>
          <TextInput style={styles.input} value={admissionDate} onChangeText={setAdmissionDate} placeholder="YYYY-MM-DD" />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>离院时间 (YYYY-MM-DD)</Text>
          <TextInput style={styles.input} value={dischargeDate} onChangeText={setDischargeDate} placeholder="YYYY-MM-DD" />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>死亡时间 (YYYY-MM-DD)</Text>
          <TextInput style={styles.input} value={deathDate} onChangeText={setDeathDate} placeholder="YYYY-MM-DD" />
        </View>
      </View>

      {/* Module 3: Physical and Contact Information */}
      <View style={styles.moduleContainer}>
        <Text style={styles.moduleTitle}>身体与联系信息</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>身高 (cm)</Text>
          <TextInput style={styles.input} value={height} onChangeText={setHeight} keyboardType="numeric" />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>体重 (kg)</Text>
          <TextInput style={styles.input} value={weight} onChangeText={setWeight} keyboardType="numeric" />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>民族</Text>
          <TextInput style={styles.input} value={ethnicity} onChangeText={setEthnicity} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>籍贯</Text>
          <TextInput style={styles.input} value={nativePlace} onChangeText={setNativePlace} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>详细地址</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={detailedAddress}
            onChangeText={setDetailedAddress}
            multiline
            numberOfLines={3}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>紧急联系人姓名</Text>
          <TextInput style={styles.input} value={emergencyContactName} onChangeText={setEmergencyContactName} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>紧急联系人电话</Text>
          <TextInput style={styles.input} value={emergencyContactPhone} onChangeText={setEmergencyContactPhone} keyboardType="phone-pad" />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>信息提供者</Text>
          <TextInput style={styles.input} value={informationProvider} onChangeText={setInformationProvider} />
        </View>
      </View>

      <View style={styles.buttonView}>
        <Button title="保存并继续" onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: Platform.OS === 'web' ? 200 : 15, // Wider padding for web
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  moduleContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#555',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#444',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    color: '#333',
  },
  displayInput: {
    backgroundColor: '#e9e9e9', // Slightly different background for read-only
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 14,
    color: '#555',
  },
  multilineInput: {
    height: 80, // Adjust height for multiline
    textAlignVertical: 'top', // For Android
  },
  buttonView: {
    marginTop: 10,
    marginBottom: 30, // Extra space at the bottom
  }
});

export default NewAssessmentScreenA1;
