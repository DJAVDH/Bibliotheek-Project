<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LibraryController extends AbstractController
{
    #[Route('/', name: 'homepage')]
    public function homepage(): Response
    {
        $genres = ['Fiction', 'Non-Fiction', 'Science', 'History'];
        return $this->render('home.html.twig', [
        'genres' => $genres,
        ]);
    }

    #[Route('/genre/{name}', name: 'genre_page')]
    public function genre(string $name): Response
    {
        return $this->render('genre.html.twig', [
            'genre' => ucfirst($name),
        ]);
    }
}
