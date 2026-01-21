<?php

namespace App\Repository;

use App\Entity\Book;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Book>
 */
class BookRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Book::class);
    }

    /**
     * Get 3 random books
     */
    public function findRandomBooks(int $limit = 3): array
    {
        try {
            $em = $this->getEntityManager();
            $connection = $em->getConnection();
            
            $sql = 'SELECT `id`, `title`, `author` FROM `books` ORDER BY RAND() LIMIT ' . (int)$limit;
            $result = $connection->executeQuery($sql);
            
            $books = [];
            foreach ($result->fetchAllAssociative() as $row) {
                $book = new Book();
                $book->setId((int)$row['id']);
                $book->setTitle($row['title'] ?? 'Unknown');
                $book->setAuthor($row['author'] ?? 'Unknown Author');
                $books[] = $book;
            }
            
            return $books;
        } catch (\Exception $e) {
            // Fallback: return empty array if query fails
            return [];
        }
    }
}
