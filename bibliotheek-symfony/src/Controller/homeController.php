<?php

namespace App\Controller;

use App\Repository\BookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class homeController extends AbstractController
{
    #[Route('/', name: 'homepage')]
    #[Route('/home', name: 'home')]
    public function index(BookRepository $bookRepository): Response
    {
        // Simple genre list with IDs for now
        $genres = [
            ['id' => 1, 'name' => 'Fiction'],
            ['id' => 2, 'name' => 'Non-Fiction'],
            ['id' => 3, 'name' => 'Science'],
            ['id' => 4, 'name' => 'History']
        ];
        $randomBooks = $bookRepository->findRandomBooks(3);
        
        return $this->render('home.html.twig', [
            'genres' => $genres,
            'randomBooks' => $randomBooks,
        ]);
    }
}
