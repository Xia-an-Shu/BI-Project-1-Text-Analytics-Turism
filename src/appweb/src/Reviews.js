import React, { useState } from 'react';

import star1 from './1star.png'
import star2 from './2star.png'
import star3 from './3star.png'
import star4 from './4star.png'
import star5 from './5star.png'

function Reviews({ results }) {
    // Estados para manejar la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 5;
    const maxPageButtons = 5;

    // Calcular el índice inicial y final de las reseñas para la página actual
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = results.slice(indexOfFirstReview, indexOfLastReview);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(results.length / reviewsPerPage);

    // Función para manejar el cambio de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calcular los botones de paginación a mostrar
    const getPaginationButtons = () => {
        const buttons = [];
        let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
        
        // Ajustar el rango de botones si es necesario
        if (endPage - startPage + 1 < maxPageButtons) {
            startPage = Math.max(1, endPage - maxPageButtons + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(i);
        }

        return buttons;
    };

    return (
        <div className='reviews_title'>
            <h3>Resultados:</h3>
            <ul className="review-list">
                <li className="review-item2">
                    <div className="review-text"><strong>Review</strong></div>
                    <div className="review-prediction"><strong>Clasificación</strong></div>
                </li>
                {currentReviews.map((result, index) => (
                    <li key={index} className="review-item">
                        <div className="review-text">{result.review}</div>
                        <div className="review-prediction">
                        {result.prediction === 1 && <img src={star1} alt="1estrella" />}
                        {result.prediction === 2 && <img src={star2} alt="2estrella" />}
                        {result.prediction === 3 && <img src={star3} alt="3estrella" />}
                        {result.prediction === 4 && <img src={star4} alt="4estrella" />}
                        {result.prediction === 5 && <img src={star5} alt="5estrella" />}
                        </div>
                    </li>
                ))}
            </ul>

            {/* Paginación */}
            <div className="pagination">
                {currentPage > 1 && (
                    <button onClick={() => paginate(currentPage - 1)}>Anterior</button>
                )}
                {getPaginationButtons().map((page) => (
                    <button
                        key={page}
                        onClick={() => paginate(page)}
                        className={currentPage === page ? 'active' : ''}
                    >
                        {page}
                    </button>
                ))}
                {currentPage < totalPages && (
                    <button onClick={() => paginate(currentPage + 1)}>Siguiente</button>
                )}
            </div>
        </div>
    );
}

export default Reviews;
