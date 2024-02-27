import React, { useState } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, List, ListItem, Image, Stack, Text, useToast } from "@chakra-ui/react";
import { FaCamera, FaUpload, FaTrashAlt, FaSignInAlt } from "react-icons/fa";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [photos, setPhotos] = useState([]);
  const toast = useToast();

  const handleLogin = () => {
    // TODO: Integrate actual login logic
    setIsLoggedIn(true);
  };

  const handleUpload = async (event) => {
    const files = Array.from(event.target.files);
    // Simulating grouped analysis for each batch of images
    // Assuming the analysis is asynchronous and takes some time
    const analysisResult = await simulateImageAnalysis(files);
    const newPhotosBatch = {
      urls: files.map((file) => URL.createObjectURL(file)),
      analysis: analysisResult,
    };
    setPhotos((prevPhotos) => [...prevPhotos, newPhotosBatch]);
  };

  // Simulate the AI analysis process
  const simulateImageAnalysis = (files) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const analysisResult = "Full analysis of the images for each detected room.";
        resolve(analysisResult);
      }, 2000); // Simulate a network request with a 2 second delay
    });
  };

  const handleDelete = (index) => {
    // TODO: Integrate actual delete logic
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
  };

  return (
    <Container maxW="container.md" py={8}>
      <Heading mb={6}>Property Damage Photo Manager</Heading>
      {!isLoggedIn ? (
        <Flex width="full" align="center" justifyContent="center">
          <Button leftIcon={<FaSignInAlt />} colorScheme="teal" onClick={handleLogin}>
            Login to Access Portal
          </Button>
        </Flex>
      ) : (
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="photo-upload">Upload a Photo</FormLabel>
            <Input type="file" id="photo-upload" accept="image/*" onChange={(e) => handleUpload(e)} multiple />
            <Button leftIcon={<FaUpload />} colorScheme="blue" mt={2} onClick={handleUpload}>
              Upload
            </Button>
          </FormControl>
          <Box>
            <Heading size="md" mb={2}>
              Your Photos
            </Heading>
            <List spacing={3}>
              {photos.length === 0 ? (
                <Text>No photos uploaded yet.</Text>
              ) : (
                photos.map((batch, index) => (
                  <Box key={index} p={3} boxShadow="md" borderRadius="md" bg="gray.50" mb={4}>
                    <Heading size="sm" mb={2}>
                      Analysis {index + 1}
                    </Heading>
                    <Text mb={4}>{batch.analysis}</Text>
                    <Flex justify="space-between" wrap="wrap">
                      {batch.urls.map((url, urlIndex) => (
                        <Image key={urlIndex} boxSize="100px" src={url} alt={`Photo ${urlIndex + 1}`} m={1} />
                      ))}
                    </Flex>
                    <Button leftIcon={<FaTrashAlt />} colorScheme="red" mt={3} onClick={() => handleDelete(index)}>
                      Delete Batch
                    </Button>
                  </Box>
                ))
              )}
            </List>
          </Box>
        </Stack>
      )}
    </Container>
  );
};

export default Index;
