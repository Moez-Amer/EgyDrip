import React, { useState } from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
    padding: 1.5rem;
    background: white;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    margin-bottom: 2rem;
`;

const FilterSection = styled.div`
    margin-bottom: 1.5rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

const FilterTitle = styled.h3`
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1a1a1a;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    font-size: 0.9rem;
    margin-bottom: 1rem;

    &:focus {
        outline: none;
        border-color: #000;
    }
`;

const CheckboxGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    color: #666;

    &:hover {
        color: #000;
    }
`;

const Checkbox = styled.input`
    cursor: pointer;
`;

const PriceRange = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

const PriceInput = styled.input`
    width: 100px;
    padding: 0.5rem;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    font-size: 0.9rem;

    &:focus {
        outline: none;
        border-color: #000;
    }
`;

const ClearFilters = styled.button`
    width: 100%;
    padding: 0.8rem;
    background: none;
    border: 1px solid #000;
    border-radius: 4px;
    color: #000;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;

    &:hover {
        background: #000;
        color: white;
    }
`;

const TypeSection = styled.div`
    margin-bottom: 1rem;
    
    &:last-child {
        margin-bottom: 0;
    }
`;

const CategoryTitle = styled.div`
    font-weight: 500;
    color: #1a1a1a;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    
    &:hover {
        color: #000;
    }
`;

const SubTypes = styled.div`
    margin-left: 1.5rem;
    display: ${props => props.isOpen ? 'block' : 'none'};
`;

const TypeCount = styled.span`
    font-size: 0.8rem;
    color: #666;
    margin-left: 0.5rem;
`;

const Arrow = styled.span`
    margin-right: 0.5rem;
    transition: transform 0.3s ease;
    display: inline-block;
    transform: ${props => props.isOpen ? 'rotate(90deg)' : 'rotate(0deg)'};
`;

const PRODUCT_CATEGORIES = {
    'Clothing': ['T-Shirts', 'Hoodies', 'Sweatshirts', 'Pants', 'Shorts', 'Jackets'],
    'Accessories': ['Caps', 'Bags', 'Socks', 'Belts', 'Wallets'],
    'Footwear': ['Sneakers', 'Slides', 'Boots'],
    'Collections': ['Summer', 'Winter', 'Limited Edition', 'Collaborations']
};

function FilterPanel({ 
    filters, 
    setFilters, 
    productTypes, 
    priceRange,
    onClearFilters,
    productCounts 
}) {
    const [openCategories, setOpenCategories] = useState(Object.keys(PRODUCT_CATEGORIES));

    const toggleCategory = (category) => {
        setOpenCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleSearchChange = (e) => {
        setFilters(prev => ({ ...prev, search: e.target.value }));
    };

    const handleStoreChange = (store) => {
        setFilters(prev => ({
            ...prev,
            stores: prev.stores.includes(store)
                ? prev.stores.filter(s => s !== store)
                : [...prev.stores, store]
        }));
    };

    const handleTypeChange = (type) => {
        setFilters(prev => ({
            ...prev,
            types: prev.types.includes(type)
                ? prev.types.filter(t => t !== type)
                : [...prev.types, type]
        }));
    };

    const handlePriceChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            price: { ...prev.price, [field]: value }
        }));
    };

    const getTypeCount = (type) => {
        return productCounts?.[type] || 0;
    };

    return (
        <FilterContainer>
            <FilterSection>
                <SearchInput
                    type="text"
                    placeholder="Search products..."
                    value={filters.search}
                    onChange={handleSearchChange}
                />
            </FilterSection>

            <FilterSection>
                <FilterTitle>Brands</FilterTitle>
                <CheckboxGroup>
                    {['Juvenile', 'TwentySeven'].map(store => (
                        <CheckboxLabel key={store}>
                            <Checkbox
                                type="checkbox"
                                checked={filters.stores.includes(store)}
                                onChange={() => handleStoreChange(store)}
                            />
                            {store}
                        </CheckboxLabel>
                    ))}
                </CheckboxGroup>
            </FilterSection>

            <FilterSection>
                <FilterTitle>Product Categories</FilterTitle>
                {Object.entries(PRODUCT_CATEGORIES).map(([category, types]) => (
                    <TypeSection key={category}>
                        <CategoryTitle onClick={() => toggleCategory(category)}>
                            <Arrow isOpen={openCategories.includes(category)}>›</Arrow>
                            {category}
                        </CategoryTitle>
                        <SubTypes isOpen={openCategories.includes(category)}>
                            <CheckboxGroup>
                                {types.map(type => (
                                    <CheckboxLabel key={type}>
                                        <Checkbox
                                            type="checkbox"
                                            checked={filters.types.includes(type)}
                                            onChange={() => handleTypeChange(type)}
                                        />
                                        {type}
                                        <TypeCount>({getTypeCount(type)})</TypeCount>
                                    </CheckboxLabel>
                                ))}
                            </CheckboxGroup>
                        </SubTypes>
                    </TypeSection>
                ))}
            </FilterSection>

            <FilterSection>
                <FilterTitle>Price Range</FilterTitle>
                <PriceRange>
                    <PriceInput
                        type="number"
                        placeholder="Min"
                        value={filters.price.min}
                        onChange={(e) => handlePriceChange('min', e.target.value)}
                        min={priceRange.min}
                        max={priceRange.max}
                    />
                    <span>-</span>
                    <PriceInput
                        type="number"
                        placeholder="Max"
                        value={filters.price.max}
                        onChange={(e) => handlePriceChange('max', e.target.value)}
                        min={priceRange.min}
                        max={priceRange.max}
                    />
                </PriceRange>
            </FilterSection>

            <ClearFilters onClick={onClearFilters}>
                Clear All Filters
            </ClearFilters>
        </FilterContainer>
    );
}

export default FilterPanel; 