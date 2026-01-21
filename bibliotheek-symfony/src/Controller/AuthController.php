<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

class AuthController extends AbstractController
{
    private UserRepository $userRepository;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(
        UserRepository $userRepository,
        UserPasswordHasherInterface $passwordHasher
    ) {
        $this->userRepository = $userRepository;
        $this->passwordHasher = $passwordHasher;
    }

    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            // Validation
            if (!isset($data['email']) || !isset($data['fullName']) || !isset($data['password'])) {
                return new JsonResponse(['error' => 'Missing required fields'], 400);
            }

            $email = trim($data['email']);
            $fullName = trim($data['fullName']);
            $password = $data['password'];

            // Validate email format
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                return new JsonResponse(['error' => 'Invalid email format'], 400);
            }

            // Check if email already exists
            if ($this->userRepository->emailExists($email)) {
                return new JsonResponse(['error' => 'Email already registered'], 409);
            }

            // Validate password strength
            if (strlen($password) < 6) {
                return new JsonResponse(['error' => 'Password must be at least 6 characters'], 400);
            }

            // Create new user
            $user = new User();
            $user->setEmail($email);
            $user->setFullName($fullName);
            
            // Hash password
            $hashedPassword = $this->passwordHasher->hashPassword($user, $password);
            $user->setPassword($hashedPassword);

            // Save user
            $this->userRepository->save($user, true);

            return new JsonResponse([
                'success' => true,
                'message' => 'Registration successful! Please log in.',
            ], 201);

        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Registration failed: ' . $e->getMessage()], 500);
        }
    }

    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            // Validation
            if (!isset($data['email']) || !isset($data['password'])) {
                return new JsonResponse(['error' => 'Missing email or password'], 400);
            }

            $email = trim($data['email']);
            $password = $data['password'];

            // Find user
            $user = $this->userRepository->findByEmail($email);

            if (!$user || !$user->isActive()) {
                return new JsonResponse(['error' => 'Invalid email or password'], 401);
            }

            // Verify password
            if (!$this->passwordHasher->isPasswordValid($user, $password)) {
                return new JsonResponse(['error' => 'Invalid email or password'], 401);
            }

            // Create session or JWT token here
            // For now, we'll return a success response
            // In production, you'd generate a JWT or create a session

            return new JsonResponse([
                'success' => true,
                'message' => 'Login successful!',
                'user' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'fullName' => $user->getFullName(),
                ]
            ], 200);

        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Login failed: ' . $e->getMessage()], 500);
        }
    }

    #[Route('/api/check-email', name: 'api_check_email', methods: ['POST'])]
    public function checkEmail(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            if (!isset($data['email'])) {
                return new JsonResponse(['error' => 'Email required'], 400);
            }

            $email = trim($data['email']);
            $exists = $this->userRepository->emailExists($email);

            return new JsonResponse([
                'exists' => $exists,
                'email' => $email
            ], 200);

        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }
}
