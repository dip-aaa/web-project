'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { marketplaceAPI } from '../../../lib/api';
import ImageCropModal from './ImageCropModal';

interface UserData {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  department?: string;
  profileImageUrl?: string;
  coverImageUrl?: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData | null;
  onUpdate: (data: Partial<UserData>) => void;
}

export default function EditProfileModal({ isOpen, onClose, userData, onUpdate }: EditProfileModalProps) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState('');
  const [coverPreview, setCoverPreview] = useState('');
  const [uploading, setUploading] = useState(false);
  
  // Crop modal states
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState('');
  const [cropType, setCropType] = useState<'profile' | 'cover'>('profile');

  useEffect(() => {
    if (userData) {
      setName(userData.name || '');
      setPhoneNumber(userData.phoneNumber || '');
      setDepartment(userData.department || '');
      setProfilePreview(userData.profileImageUrl || '');
      setCoverPreview(userData.coverImageUrl || '');
    }
  }, [userData, isOpen]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImageSrc(reader.result as string);
        setCropType('profile');
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImageSrc(reader.result as string);
        setCropType('cover');
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const handleCropComplete = (croppedImageBlob: Blob) => {
    // Convert blob to file
    const fileName = cropType === 'profile' ? 'profile-image.jpg' : 'cover-image.jpg';
    const croppedFile = new File([croppedImageBlob], fileName, { type: 'image/jpeg' });
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      if (cropType === 'profile') {
        setProfileImage(croppedFile);
        setProfilePreview(reader.result as string);
      } else {
        setCoverImage(croppedFile);
        setCoverPreview(reader.result as string);
      }
    };
    reader.readAsDataURL(croppedFile);
    
    // Close crop modal
    setCropModalOpen(false);
  };

  const handleSave = async () => {
    setUploading(true);
    let profileImageUrl = userData?.profileImageUrl || '';
    let coverImageUrl = userData?.coverImageUrl || '';

    try {
      // Upload profile image if selected
      if (profileImage) {
        const uploadResponse = await marketplaceAPI.uploadImage(profileImage);
        if (uploadResponse.success) {
          profileImageUrl = uploadResponse.data.url;
        } else {
          alert('Failed to upload profile image: ' + uploadResponse.message);
          setUploading(false);
          return;
        }
      }

      // Upload cover image if selected
      if (coverImage) {
        const uploadResponse = await marketplaceAPI.uploadImage(coverImage);
        if (uploadResponse.success) {
          coverImageUrl = uploadResponse.data.url;
        } else {
          alert('Failed to upload cover image: ' + uploadResponse.message);
          setUploading(false);
          return;
        }
      }

      // Call onUpdate with all data
      onUpdate({
        name,
        phoneNumber,
        department,
        profileImageUrl,
        coverImageUrl
      });

      // Reset form
      setProfileImage(null);
      setCoverImage(null);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.6)',
              zIndex: 9998,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 50 }}
              transition={{ 
                type: 'spring', 
                damping: 25, 
                stiffness: 300,
                bounce: 0.4
              }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(145deg, #ffffff, #fef8f0)',
                borderRadius: 32,
                padding: 40,
                maxWidth: 600,
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 25px 70px rgba(107, 68, 35, 0.4), 0 10px 30px rgba(245, 199, 126, 0.3)',
                border: '3px solid #f5c77e',
                position: 'relative'
              }}
            >
            {/* Header */}
            <div style={{ marginBottom: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 28, fontWeight: 'bold', color: '#6b4423', textShadow: '2px 2px 4px rgba(245, 199, 126, 0.3)' }}>
                ✏️ Edit Profile
              </h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                style={{
                  background: 'linear-gradient(135deg, #ffe9c9, #ffd89b)',
                  border: '2px solid #f5c77e',
                  fontSize: 20,
                  cursor: 'pointer',
                  color: '#6b4423',
                  padding: '8px 12px',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 12px rgba(245, 199, 126, 0.4)'
                }}
              >
                ✕
              </motion.button>
            </div>

            {/* Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Profile Image */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#6b4423',
                  marginBottom: 8
                }}>
                  Profile Picture
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  {profilePreview && (
                    <motion.img
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      src={profilePreview}
                      alt="Profile preview"
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '4px solid #f5c77e',
                        boxShadow: '0 6px 16px rgba(245, 199, 126, 0.4)'
                      }}
                    />
                  )}
                  <motion.input
                    whileHover={{ scale: 1.02 }}
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      borderRadius: 16,
                      border: '2px solid #f5c77e',
                      fontSize: 14,
                      color: '#6b4423',
                      outline: 'none',
                      cursor: 'pointer',
                      background: 'linear-gradient(145deg, #ffffff, #fef8f0)',
                      boxShadow: '0 4px 12px rgba(245, 199, 126, 0.2)'
                    }}
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#6b4423',
                  marginBottom: 8
                }}>
                  Cover Photo
                </label>
                {coverPreview && (
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    src={coverPreview}
                    alt="Cover preview"
                    style={{
                      width: '100%',
                      height: 120,
                      borderRadius: 16,
                      objectFit: 'cover',
                      marginBottom: 12,
                      border: '3px solid #f5c77e',
                      boxShadow: '0 6px 16px rgba(245, 199, 126, 0.3)'
                    }}
                  />
                )}
                <motion.input
                  whileHover={{ scale: 1.02 }}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 16,
                    border: '2px solid #f5c77e',
                    fontSize: 14,
                    color: '#6b4423',
                    outline: 'none',
                    cursor: 'pointer',
                    background: 'linear-gradient(145deg, #ffffff, #fef8f0)',
                    boxShadow: '0 4px 12px rgba(245, 199, 126, 0.2)'
                  }}
                />
              </div>

              {/* Name */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#6b4423',
                  marginBottom: 8
                }}>
                  Full Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02, borderColor: '#f5c77e' }}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: 16,
                    border: '2px solid #f0e6dc',
                    fontSize: 15,
                    color: '#6b4423',
                    outline: 'none',
                    background: 'linear-gradient(145deg, #ffffff, #fef8f0)',
                    boxShadow: '0 2px 8px rgba(245, 199, 126, 0.15)',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#6b4423',
                  marginBottom: 8
                }}>
                  Phone Number
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02, borderColor: '#f5c77e' }}
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g., +977 9812345678"
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: 16,
                    border: '2px solid #f0e6dc',
                    fontSize: 15,
                    color: '#6b4423',
                    outline: 'none',
                    background: 'linear-gradient(145deg, #ffffff, #fef8f0)',
                    boxShadow: '0 2px 8px rgba(245, 199, 126, 0.15)',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>

              {/* Department */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#6b4423',
                  marginBottom: 8
                }}>
                  Department
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02, borderColor: '#f5c77e' }}
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g., Computer Science"
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: 16,
                    border: '2px solid #f0e6dc',
                    fontSize: 15,
                    color: '#6b4423',
                    outline: 'none',
                    background: 'linear-gradient(145deg, #ffffff, #fef8f0)',
                    boxShadow: '0 2px 8px rgba(245, 199, 126, 0.15)',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(245, 199, 126, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  disabled={uploading}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #ffd89b, #f5c77e)',
                    color: '#6b4423',
                    border: 'none',
                    borderRadius: 18,
                    padding: '16px 24px',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                    fontSize: 16,
                    opacity: uploading ? 0.6 : 1,
                    boxShadow: '0 6px 16px rgba(245, 199, 126, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {uploading ? '⏳ Saving...' : '💾 Save Changes'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(212, 165, 116, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  disabled={uploading}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(145deg, #ffffff, #fef8f0)',
                    color: '#6b4423',
                    border: '2px solid #f5c77e',
                    borderRadius: 18,
                    padding: '16px 24px',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                    fontSize: 16,
                    boxShadow: '0 4px 12px rgba(212, 165, 116, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
        </>
      )}
      
      {/* Image Crop Modal */}
      <ImageCropModal
        isOpen={cropModalOpen}
        imageSrc={tempImageSrc}
        onClose={() => setCropModalOpen(false)}
        onCropComplete={handleCropComplete}
        aspectRatio={cropType === 'profile' ? 1 : 16 / 5}
        cropShape={cropType === 'profile' ? 'round' : 'rect'}
        title={cropType === 'profile' ? '📸 Adjust Profile Picture' : '🖼️ Adjust Cover Photo'}
      />
    </AnimatePresence>
  );
}
