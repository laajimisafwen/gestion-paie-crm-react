import React, { useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.css';
import Navbar from "../../Components/Navbar/Navbar";
import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';

function Home() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        fade: true,
    };

    useEffect(() => {
        const originalBackground = document.body.style.backgroundImage;
        document.body.style.backgroundImage = "none";

        return () => {
            document.body.style.backgroundImage = originalBackground;
            document.body.style.backgroundColor = "#050d7c";
        };
    }, []);

    return (
        <>
            <Navbar />
            <div className="home-style">
                <section className="banner">
                    <Slider {...settings}>
                        <div className="slide-item">
                            <img src={banner1} alt="Office Workspace" />
                            <div className="banner-text">
                                <h1>Découvrez le monde de la gestion de la paie</h1>
                            </div>
                        </div>
                        <div className="slide-item">
                            <img src={banner2} alt="Payroll Processing" />
                            <div className="banner-text">
                                <h1>Précision et efficacité en paie</h1>
                            </div>
                        </div>
                        <div className="slide-item">
                            <img src={banner3} alt="Financial Planning" />
                            <div className="banner-text">
                                <h1>Optimisation des processus financiers</h1>
                            </div>
                        </div>
                    </Slider>
                </section>
                <section className="introduction">
                    <h2>Bienvenue chez Paie Tunisie Solutions</h2>
                    <p>Notre entreprise garantit une gestion précise et efficace de vos bulletins de paie.</p>
                </section>
                <section className="mission">
                    <h2>Notre Mission</h2>
                    <p>Assurer une gestion fiable et transparente de la paie pour optimiser les performances financières de nos clients.</p>
                </section>
                <section className="features">
                    <h2>Caractéristiques Uniques</h2>
                    <ul>
                        <li>Gestion automatisée de la paie</li>
                        <li>Conformité fiscale garantie</li>
                        <li>Rapports détaillés et analytics</li>
                    </ul>
                </section>
                <section className="programs">
                    <h2>Nos Services</h2>
                    <div className="program-details">
                        <article>
                            <h3>Calcul de la Paie</h3>
                            <p>Services de calcul des bulletins de paie, incluant les déductions et les contributions de sécurité sociale.</p>
                        </article>
                        <article>
                            <h3>Gestion des Déclarations</h3>
                            <p>Préparation et soumission de toutes les déclarations fiscales et sociales nécessaires.</p>
                        </article>
                        <article>
                            <h3>Consultation Financière</h3>
                            <p>Conseils d'experts pour optimiser les processus de paie et améliorer les stratégies financières globales.</p>
                        </article>
                    </div>
                </section>
                <section className="testimonials">
                    <h2>Témoignages</h2>
                    <p>"Un service fiable qui a transformé la façon dont nous gérons nos finances. Leur équipe est compétente et très réactive." - Jean Moreau</p>
                </section>
                <section className="contact">
                    <h2>Contactez-nous</h2>
                    <div>
                        <p>Adresse: Sahloul, Sousse</p>
                        <p>Téléphone: 53924732</p>
                        <p>Email: ladjimi.safwen@gmail.com</p>
                    </div>
                </section>
                
            </div>
        </>
    );
}

export default Home;
