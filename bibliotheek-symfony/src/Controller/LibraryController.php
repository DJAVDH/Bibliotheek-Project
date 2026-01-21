<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\DBAL\Connection;

class LibraryController extends AbstractController
{
    #[Route('/', name: 'homepage')]
    public function homepage(Connection $connection): Response
    {
        $genres = [];
        try {
            $result = $connection->executeQuery('SELECT genre_id as id, name FROM genres ORDER BY name');
            $genres = $result->fetchAllAssociative();
        } catch (\Exception $e) {
            // Log error - genres will remain empty array
            error_log('Error fetching genres: ' . $e->getMessage());
        }
        return $this->render('home.html.twig', [
        'genres' => $genres,
        ]);
    }

    #[Route('/test-genres', name: 'test_genres')]
    public function testGenres(Connection $connection): Response
    {
        try {
            $result = $connection->executeQuery('SELECT genre_id as id, name FROM genres ORDER BY name');
            $genres = $result->fetchAllAssociative();
            return new Response(json_encode($genres), 200, ['Content-Type' => 'application/json']);
        } catch (\Exception $e) {
            return new Response(json_encode(['error' => $e->getMessage()]), 500, ['Content-Type' => 'application/json']);
        }
    }

    #[Route('/genre/{id}', name: 'genre_page')]
    public function genre(int $id, Connection $connection): Response
    {
        $genre = null;
        $books = [];
        try {
            // Get genre information
            $result = $connection->executeQuery('SELECT genre_id as id, name FROM genres WHERE genre_id = ?', [$id]);
            $genre = $result->fetchAssociative();
            
            if (!$genre) {
                throw $this->createNotFoundException('Genre not found');
            }
            
            // Get books for this genre
            $booksResult = $connection->executeQuery(
                'SELECT b.book_id, b.title, b.created_at
                 FROM books b
                 INNER JOIN book_genres bg ON b.book_id = bg.book_id
                 WHERE bg.genre_id = ?
                 ORDER BY b.title',
                [$id]
            );
            $books = $booksResult->fetchAllAssociative();
        } catch (\Exception $e) {
            $genre = null;
            $books = [];
        }
        
        if (!$genre) {
            throw $this->createNotFoundException('Genre not found');
        }
        
        return $this->render('genre.html.twig', [
            'genre' => $genre,
            'books' => $books,
        ]);
    }

    #[Route('/navigatie', name: 'navigatie')]
    public function navigatie(): Response
    {
        return $this->render('navigatie.html.twig');
    }
}
