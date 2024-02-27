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

  const handleUpload = (event) => {
    const files = Array.from(event.target.files);
    // TODO: Handle actual file upload and integrate with backend API
    // Assuming the backend returns an object with the URL and analysis for each photo
    const newPhotos = files.map((file) => ({
      url: URL.createObjectURL(file),
      analysis: "Pending analysis...", // This will be updated once the actual analysis is done
    }));
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    toast({
      title: "Photos uploaded",
      description: "We've uploaded your photos for analysis!",
      status: "success",
      duration: 5000,
      isClosable: true,
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
                photos.map((photo, index) => (
                  <ListItem key={index} p={3} boxShadow="md" borderRadius="md" bg="gray.50">
                    <Flex align="center" justify="space-between">
                      <Image boxSize="100px" src={photo.url} alt={`Photo ${index + 1}`} />
                      <Text flex="1" ml={4}>
                        {photo.analysis}
                      </Text>
                      <Button leftIcon={<FaTrashAlt />} colorScheme="red" onClick={() => handleDelete(index)}>
                        Delete
                      </Button>
                    </Flex>
                  </ListItem>
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
