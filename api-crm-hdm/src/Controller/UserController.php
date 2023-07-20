<?php
namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


#[Route('/api')]
#[ApiResource()]
class UserController extends AbstractController
{
    #[Route('/users', name: 'api_users_create', defaults: ['_api_resource_class' => User::class], methods: ['POST'])]
    public function createUserAction(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $userPasswordHasher): Response
    {
        $data = json_decode($request->getContent(), true);

        $user = new User();
        $user->setUsername($data['username']);
        $user->setFirstName($data['firstName']);
        $user->setLastName($data['lastName']);
        $user->setTelephone($data['telephone']);
        $user->setMail($data['mail']);

        // encode the plain password
        $user->setPassword(
            $userPasswordHasher->hashPassword(
                $user,
                $data[('password')]
            )
        );

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json($user, Response::HTTP_CREATED);
    }
}