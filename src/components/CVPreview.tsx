import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { CVData } from '../types/cv-data';

interface CVPreviewProps {
  cvData: CVData;
}

// DIN 5008 compliant styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 27, // 27mm top margin
    paddingBottom: 20, // 20mm bottom margin
    paddingLeft: 25, // 25mm left margin
    paddingRight: 20, // 20mm right margin
    lineHeight: 1.4,
  },
  
  // Classic format styles
  classicHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  classicPersonalInfo: {
    flex: 1,
  },
  classicPhoto: {
    width: 80, // ~4cm
    height: 100, // ~5cm
    marginLeft: 20,
    border: '1pt solid #ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // ATS format styles (single column)
  atsHeader: {
    marginBottom: 20,
  },
  
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 2,
  },
  
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  
  // Two-column layout for classic format
  entryContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dateColumn: {
    width: '30%',
    fontSize: 10,
    paddingRight: 10,
  },
  contentColumn: {
    width: '70%',
  },
  
  // Single column for ATS format
  atsEntry: {
    marginBottom: 12,
  },
  
  entryTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  entrySubtitle: {
    fontSize: 10,
    color: '#666',
    marginBottom: 4,
  },
  bullet: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 2,
  },
  
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  skillCategory: {
    marginBottom: 10,
  },
  skillCategoryTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  skillItem: {
    fontSize: 10,
    marginBottom: 2,
  },
  
  signature: {
    marginTop: 30,
    fontSize: 10,
  },
});

export function CVPreview({ cvData }: CVPreviewProps) {
  const { personal, experience, education, skills, projects, certificates, hobbies, meta } = cvData;
  const isClassic = meta.designFormat === 'classic';
  const isGerman = meta.language === 'de';

  const labels = {
    de: {
      cv: 'Lebenslauf',
      experience: 'Berufserfahrung',
      education: 'Ausbildung',
      skills: 'Kenntnisse',
      languages: 'Sprachen',
      it: 'IT-Kenntnisse',
      other: 'Sonstige Kenntnisse',
      projects: 'Projekte',
      certificates: 'Zertifikate',
      hobbies: 'Hobbys und Interessen',
      birthDate: 'Geburtsdatum',
      birthPlace: 'Geburtsort',
      nationality: 'Staatsangehörigkeit',
      maritalStatus: 'Familienstand',
      current: 'heute',
    },
    en: {
      cv: 'Curriculum Vitae',
      experience: 'Work Experience',
      education: 'Education',
      skills: 'Skills',
      languages: 'Languages',
      it: 'IT Skills',
      other: 'Other Skills',
      projects: 'Projects',
      certificates: 'Certificates',
      hobbies: 'Hobbies and Interests',
      birthDate: 'Date of Birth',
      birthPlace: 'Place of Birth',
      nationality: 'Nationality',
      maritalStatus: 'Marital Status',
      current: 'current',
    }
  };

  const t = labels[isGerman ? 'de' : 'en'];

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    if (dateStr.toLowerCase() === 'heute' || dateStr.toLowerCase() === 'current') {
      return t.current;
    }
    return dateStr;
  };

  const renderPersonalInfo = () => (
    <View>
      <Text style={styles.name}>
        {personal.title && `${personal.title} `}{personal.firstName} {personal.lastName}
      </Text>
      
      <Text style={styles.contactInfo}>
        {personal.street} {personal.houseNumber}
      </Text>
      <Text style={styles.contactInfo}>
        {personal.postalCode} {personal.city}
      </Text>
      
      {personal.phone && (
        <Text style={styles.contactInfo}>Tel: {personal.phone}</Text>
      )}
      {personal.email && (
        <Text style={styles.contactInfo}>E-Mail: {personal.email}</Text>
      )}
      {personal.linkedin && (
        <Text style={styles.contactInfo}>LinkedIn: {personal.linkedin}</Text>
      )}
      {personal.xing && (
        <Text style={styles.contactInfo}>Xing: {personal.xing}</Text>
      )}
      
      {personal.dateOfBirth && (
        <Text style={styles.contactInfo}>{t.birthDate}: {personal.dateOfBirth}</Text>
      )}
      {personal.placeOfBirth && (
        <Text style={styles.contactInfo}>{t.birthPlace}: {personal.placeOfBirth}</Text>
      )}
      {personal.nationality && (
        <Text style={styles.contactInfo}>{t.nationality}: {personal.nationality}</Text>
      )}
      {personal.maritalStatus && (
        <Text style={styles.contactInfo}>{t.maritalStatus}: {personal.maritalStatus}</Text>
      )}
    </View>
  );

  const renderPhotoPlaceholder = () => (
    <View style={styles.classicPhoto}>
      {personal.photoDataUrl ? (
        <Image src={personal.photoDataUrl} style={{ width: '100%', height: '100%' }} />
      ) : (
        <Text style={{ fontSize: 8, color: '#999', textAlign: 'center' }}>
          Foto{'\n'}4 × 5 cm
        </Text>
      )}
    </View>
  );

  const renderExperience = () => (
    <View>
      <Text style={styles.sectionTitle}>{t.experience}</Text>
      {experience.map((entry) => (
        <View key={entry.id} style={isClassic ? styles.entryContainer : styles.atsEntry}>
          {isClassic ? (
            <>
              <View style={styles.dateColumn}>
                <Text>{formatDate(entry.startDate)} – {formatDate(entry.endDate)}</Text>
              </View>
              <View style={styles.contentColumn}>
                <Text style={styles.entryTitle}>{entry.role}</Text>
                <Text style={styles.entrySubtitle}>{entry.employer}, {entry.city}</Text>
                {entry.bullets.map((bullet, index) => (
                  <Text key={index} style={styles.bullet}>• {bullet}</Text>
                ))}
              </View>
            </>
          ) : (
            <View>
              <Text style={styles.entryTitle}>
                {entry.role} | {entry.employer}, {entry.city}
              </Text>
              <Text style={styles.entrySubtitle}>
                {formatDate(entry.startDate)} – {formatDate(entry.endDate)}
              </Text>
              {entry.bullets.map((bullet, index) => (
                <Text key={index} style={styles.bullet}>• {bullet}</Text>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );

  const renderEducation = () => (
    <View>
      <Text style={styles.sectionTitle}>{t.education}</Text>
      {education.map((entry) => (
        <View key={entry.id} style={isClassic ? styles.entryContainer : styles.atsEntry}>
          {isClassic ? (
            <>
              <View style={styles.dateColumn}>
                <Text>{formatDate(entry.startDate)} – {formatDate(entry.endDate)}</Text>
              </View>
              <View style={styles.contentColumn}>
                <Text style={styles.entryTitle}>{entry.degree}</Text>
                <Text style={styles.entrySubtitle}>{entry.institution}, {entry.city}</Text>
                {entry.grade && (
                  <Text style={styles.entrySubtitle}>Note: {entry.grade}</Text>
                )}
                {entry.bullets.map((bullet, index) => (
                  <Text key={index} style={styles.bullet}>• {bullet}</Text>
                ))}
              </View>
            </>
          ) : (
            <View>
              <Text style={styles.entryTitle}>
                {entry.degree} | {entry.institution}, {entry.city}
              </Text>
              <Text style={styles.entrySubtitle}>
                {formatDate(entry.startDate)} – {formatDate(entry.endDate)}
                {entry.grade && ` | Note: ${entry.grade}`}
              </Text>
              {entry.bullets.map((bullet, index) => (
                <Text key={index} style={styles.bullet}>• {bullet}</Text>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );

  const renderSkills = () => (
    <View>
      <Text style={styles.sectionTitle}>{t.skills}</Text>
      <View style={isClassic ? styles.skillsContainer : {}}>
        {skills.languages.length > 0 && (
          <View style={styles.skillCategory}>
            <Text style={styles.skillCategoryTitle}>{t.languages}:</Text>
            {skills.languages.map((skill) => (
              <Text key={skill.id} style={styles.skillItem}>
                {skill.name} ({skill.level})
              </Text>
            ))}
          </View>
        )}
        
        {skills.it.length > 0 && (
          <View style={styles.skillCategory}>
            <Text style={styles.skillCategoryTitle}>{t.it}:</Text>
            {skills.it.map((skill) => (
              <Text key={skill.id} style={styles.skillItem}>
                {skill.name} ({skill.level})
              </Text>
            ))}
          </View>
        )}
        
        {skills.other.length > 0 && (
          <View style={styles.skillCategory}>
            <Text style={styles.skillCategoryTitle}>{t.other}:</Text>
            {skills.other.map((skill) => (
              <Text key={skill.id} style={styles.skillItem}>
                {skill.name} ({skill.level})
              </Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );

  const renderProjects = () => projects.length > 0 && (
    <View>
      <Text style={styles.sectionTitle}>{t.projects}</Text>
      {projects.map((project) => (
        <View key={project.id} style={styles.atsEntry}>
          <Text style={styles.entryTitle}>{project.name}</Text>
          <Text style={styles.bullet}>{project.description}</Text>
          {project.url && (
            <Text style={styles.bullet}>{project.url}</Text>
          )}
        </View>
      ))}
    </View>
  );

  const renderCertificates = () => certificates.length > 0 && (
    <View>
      <Text style={styles.sectionTitle}>{t.certificates}</Text>
      {certificates.map((cert) => (
        <View key={cert.id} style={styles.atsEntry}>
          <Text style={styles.entryTitle}>{cert.name}</Text>
          <Text style={styles.entrySubtitle}>{cert.issuer} | {cert.date}</Text>
        </View>
      ))}
    </View>
  );

  const renderHobbies = () => hobbies && (
    <View>
      <Text style={styles.sectionTitle}>{t.hobbies}</Text>
      <Text style={styles.bullet}>{hobbies}</Text>
    </View>
  );

  const renderSignature = () => (
    <View style={styles.signature}>
      <Text>
        {meta.signatureCity}, {meta.signatureDate}
      </Text>
      <Text style={{ marginTop: 20 }}>
        _________________________
      </Text>
      <Text style={{ fontSize: 8, color: '#666' }}>
        Unterschrift
      </Text>
    </View>
  );

  return (
    <PDFViewer style={{ width: '100%', height: '100%' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header with CV title */}
          <Text style={styles.title}>{t.cv}</Text>
          
          {/* Personal Information Header */}
          {isClassic ? (
            <View style={styles.classicHeader}>
              {renderPersonalInfo()}
              {renderPhotoPlaceholder()}
            </View>
          ) : (
            <View style={styles.atsHeader}>
              {renderPersonalInfo()}
            </View>
          )}

          {/* CV Sections */}
          {renderExperience()}
          {renderEducation()}
          {renderSkills()}
          {renderProjects()}
          {renderCertificates()}
          {renderHobbies()}
          {renderSignature()}
        </Page>
      </Document>
    </PDFViewer>
  );
}