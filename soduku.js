
// let problem=    [
//     ['','7','9','','','','','',''],
//     ['','','','8','','','','',''],
//     ['','','','','','','3','',''],
//     ['','5','','','7','4','','',''],
//     ['3','','','','','','8','',''],
//     ['','','','6','9','','','',''],
//     ['','','','','','','','4','7'],
//     ['6','','','2','','','','',''],
//     ['','','','','','','5','9',''],
// ]

problem=    [
    ['','','7','','','8','6','',''],
    ['','','','','3','','','8',''],
    ['2','','8','','','6','','3',''],
    ['','','','4','','','8','',''],
    ['5','2','','','','','','6',''],
    ['','','','','','7','','',''],
    ['','3','','7','','9','2','4','6'],
    ['','1','','','4','','5','7',''],
    ['','','2','6','8','5','','',''],
]
let box=document.getElementById('box')





//grid maker
for (let i = 0; i <9; i++) {
    let child=document.createElement('div')
    child.classList.add('medium')
    for (let j = 0; j <9; j++) {
        let grandchild=document.createElement('div')
        grandchild.classList.add('small')   
        for (let k=0;k<9;k++){
            let g_child=document.createElement('div')
            grandchild.appendChild(g_child)
        }
        let above=document.createElement('div')
        above.classList.add('above') 
        grandchild.appendChild(above)
        child.appendChild(grandchild)
    }
    box.appendChild(child)
}





//helper functions
function isString(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}
function from_grid_postion(box1,box2){
    let col=(box1%3)*3+box2%3
    let row=Math.floor(box1/3)*3+Math.floor(box2/3)
    return [row,col]
}





//ptoblem writers
// write the problem
function write_problem(p){
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let result=from_grid_postion(i,j)
            if(p[result[0]][result[1]]!=''){
                let element=box.children[i].children[j]
                element.children[element.children.length-1].innerText=p[result[0]][result[1]]
            }
        }      
    }
}
//write the problem with candidated in each cell
function write_problem_with_possible_numbers(p){
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let result=from_grid_postion(i,j)
            if(p[result[0]][result[1]]==''){
                let possibles=possible_numbers(p,result[0],result[1])
                for (let k=1;k<10;k++){
                    if(possibles.includes(k)){
                        box.children[i].children[j].children[k-1].innerText=k
                    }
                    else{
                        box.children[i].children[j].children[k-1].innerText=''
                    }
                }
                box.children[i].children[j].children[9].classList.add('disappear')
            }
            else{
                box.children[i].children[j].children[9].innerText=p[result[0]][result[1]]
                box.children[i].children[j].children[9].classList.remove('disappear')
            }
        }   
    }
}
//fill single cell with cnididates or number according to single element passed is array or string
function write_cell(num_to_write,i,j){
    let result=from_grid_postion(i,j)
    i=result[0]
    j=result[1]
    if(!isString(num_to_write)){
        for (let k=1;k<10;k++){
            if(num_to_write.includes(k)){
                box.children[i].children[j].children[k-1].innerText=k
            }
            else{
                box.children[i].children[j].children[k-1].innerText=''
            }
            
        }
        box.children[i].children[j].children[9].classList.add('disappear')
    }
    else{
        box.children[i].children[j].children[9].innerText=num_to_write
        box.children[i].children[j].children[9].classList.remove('disappear')
    }
}
//write the whole object
function write_object(obj){
    
    for(let i=0;i<81;i++){
        let row =Math.floor(i/9)
        let col=i%9
        write_cell(obj[i],row,col)
    }
}





//checkers
//check if number is acceptable in a given position
function check_number(problem,number,row,col){
    for(let i=0;i<9;i++){
        if(problem[row][i]==number){return false}
    }
    for(let i=0;i<9;i++){
        if(problem[i][col]==number){return false}
    }
    let box_col=Math.floor(col/3)*3
    let box_row=Math.floor(row/3)*3

    for (let i=0;i<3;i++){
        for (let j=0;j<3;j++){
            if(problem[i+box_row][j+box_col]==number){return false}
        }   
    }
    return true
}
//check if there is a single cell with no candidated to eliminate this branch
function check_if_cell_has_possibilities(p){
    for (let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(problem[i][j]==''){
                if(possible_numbers(p,i,j).length==0){return false}
            }
        }
    }
    return true
}
//check for first empty position
function find_empty_position(problem){
    for (let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(problem[i][j]==''){return [i,j]}
        }
    }
    return -1
}
//get all possible numbers for a certain cell
function possible_numbers(problem,row,col){
    if(problem[row][col]!=''){return -1}
    let possible=[]
    for (let i=1;i<10;i++){
        if (check_number(problem,i,row,col)){possible.push(i)}
    }
    return possible
}





//problem editors
//add number to single cell in problem
function add_num(problem,num,row,col){
    let new_problem=[
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
        ['','','','','','','','',''],
    ]
    for (let i=0;i<9;i++){
        for (let j=0;j<9;j++){
            new_problem[i][j]=problem[i][j]
        }   
    }
    new_problem[row][col]=num
    return new_problem
}





//////////////////////////////////////////////////////solvers//////////////////////////////////////////////////////
//DFS using queue
async function DFS_soduko(problem){
    let frontie=[problem]
    while(frontie.length>0){
        await new Promise(r => setTimeout(r, 20));

        let node=frontie.pop()
        write_problem_with_possible_numbers(node)
        let empty=find_empty_position(node)
        if(empty==-1){break}
        let actions=possible_numbers(node,empty[0],empty[1])
        for (let a_num=0;a_num<actions.length;a_num++){
            let child=add_num(node,actions[a_num],empty[0],empty[1])
            if(check_if_cell_has_possibilities(child)){
                frontie.push(child)
            }
        }
    }
}
DFS_soduko(problem)


//////////////////////////solve using rules//////////////////////////


//naked single  ==>>    naked_single
//hiden single    naked pairs   naked trible    naked quads ==>>    naked_eliminator
//pointing pairs  claiming pairs     ==>>   pointer_claiming
//x_wing  hiden pairs     

//get object to be edited later instead of dealing with problem directly
function possible_chices_object_maker(p){
    let object=[]
    for (let i=0;i<9;i++){
        for (let j=0;j<9;j++){
            let possible_nums=possible_numbers(p,i,j)
            if(possible_nums!=-1){
                object.push(possible_nums)
            }
            else{
                object.push(p[i][j])
            }
        }     
    }
    return object
}
//solve the object using rulers
async function solve_object(problem){
    write_problem_with_possible_numbers(problem)
    let object = possible_chices_object_maker(problem)
    while(eliminator(object)){
        await new Promise(r => setTimeout(r, 500));

        write_object(object)
    }
}

//remove elimination elements from group
function remover(group,elimination){
    let no_edit=false
    for (let j=0;j<elimination.length;j++){
        for(let i=0;i<group.length;i++){
            if(!isString(group[i]) && group[i].includes(elimination[j]) ){
                let index=group[i].indexOf(elimination[j])
                group[i].splice(index,1)
                no_edit=true
            }
        }
    }   
    return no_edit
}

//make groups from the object (all possible rows, clos and blocks) then pass it to to group eliminator
function eliminator(object){
    
    if(!naked_single(object)){return true}
    if(!reducer(object)){return true}
    return false
}
function naked_single(object){
    for(let o=0;o<9*9;o++){
        let row =Math.floor(o/9)
        let col=o%9
        if(object[o].length==1 && !isString(object[o])){
            let group=[]
            for(let i=0;i<9;i++){
                if(object[row*9+i].includes(object[o][0]) && o!=row*9+i){
                    group.push(object[row*9+i])
                }
            }
            for(let i=0;i<9;i++){
                if(object[col+i*9].includes(object[o][0]) && o!=col+i*9){
                    group.push(object[col+i*9])
                }
            }
            let box_col=Math.floor(col/3)*3
            let box_row=Math.floor(row/3)*3
            for (let i=0;i<3;i++){
                for (let j=0;j<3;j++){
                    if(object[(i+box_row)*9+j+box_col].includes(object[o][0]) && o!=(i+box_row)*9+j+box_col){
                        group.push(object[(i+box_row)*9+j+box_col])
                    }
                }   
            }
            remover(group,object[o])
            object[o]=object[o][0].toString()
            return false
        }
    }
    return true
}
function reducer(object){
    //row elimination
     for(let i=0;i<9;i++){
        let group=[]
        let positions=[]
        for(let j=0;j<9;j++){
            group.push(object[i*9+j])
            positions.push([i,j])
        }
        if(!naked_eliminator(group)){return false}
        
        if(!pointer_claiming(group,object,positions,'row')){return false}

    }
    //col elemination
    for(let i=0;i<9;i++){
        let group=[]
        let positions=[]
        for(let j=0;j<9;j++){
            group.push(object[i+j*9])
            positions.push([j,i])
        }
        if(!naked_eliminator(group)){return false}
        if(!pointer_claiming(group,object,positions,'col')){return false}
    }
    //box elimination
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            let group=[]
            let positions=[]
            for(let k=0;k<3;k++){
                for(let l=0;l<3;l++){
                    group.push(object[(i*3)*9+k*9  +(j*3)+l ])
                    positions.push([(i*3)+k,(j*3)+l ])
                }
            }
            if(!naked_eliminator(group)){return false}
            if(!pointer_claiming(group,object,positions,'block')){return false}
        }
    }
    return true
}

function naked_eliminator(group){
    let no_edit=true
    let to_be_processed=[]
    for(let i=0;i<9;i++){
        if(!isString(group[i])){to_be_processed.push(group[i])}
    }
    if(to_be_processed.length<3){return true}
    let num_of_choices=Math.pow(2,to_be_processed.length)

    for(let num=0;num<num_of_choices;num++){
        let selection_array=[]
        let edited=[]
        let s=dec2bin(num)
        let selected=''
        for (let i=0;i<to_be_processed.length-s.length;i++){selected=selected+'0'}
        selected=selected.concat(s)
        for(let i=0;i<to_be_processed.length;i++){
            if(selected[i]==1){selection_array.push(to_be_processed[i])}
            else{edited.push(to_be_processed[i])}
        }
        let elimination=naked_test(selection_array)
        if(elimination!=-1){
            if(remover(edited,elimination)){
                no_edit=false
            }
        }
    }
    return no_edit
}
//test if this group makes a set of numbers that we can elominate from other cells
function naked_test(group){
    if(group.length<1){return -1}
    let unique=[]
    for(let i=0;i<group.length;i++){
        for(let j=0;j<group[i].length;j++){
        if(!unique.includes(group[i][j])){unique.push(group[i][j])}
        }
    }
    if(group.length==unique.length){return unique}
    return -1
}

function pointer_claiming(group,object,positions,relation){
    let to_be_procced=[]
    for(let i=0;i<group.length;i++){
        if(!isString(group[i]) && group[i].length>1){
            to_be_procced.push([positions[i],group[i]])
        }
    }

    for(let i=1;i<10;i++){
        let containing_num=[]
        for(let j=0;j<to_be_procced.length;j++){
            if(to_be_procced[j][1].includes(i)){
                containing_num.push(to_be_procced[j][0])
            }
        }
        if(!pointer_claiming_test(i,containing_num,relation,object)){return false}
    }
    return true
}


function pointer_claiming_test(num,containing_num,relation,object){
    
    if(relation=='col'){
        if(containing_num.length==2){
            if(Math.floor(containing_num[1][0]/3)==Math.floor(containing_num[0][0] /3)){
                let result=[]
                let box_row=Math.floor(containing_num[1][0]/3)
                let box_col=Math.floor(containing_num[1][1]/3)
                for (let i=0;i<9;i++){

                    if(i%3!=containing_num[0][1]%3 ){
                        result.push(object[3*(box_col+box_row*9)+i%3+Math.floor(i/3)*9])
                    }
                }
                if(remover(result,[num])){console.log(result,[num]) ;return false}
            }
        }
        if(containing_num.length==3){
            if(Math.floor(containing_num[0][0] /3)==Math.floor(containing_num[1][0] /3) && Math.floor(containing_num[0][0] /3)==Math.floor(containing_num[2][0] /3) ){
                let result=[]
                let box_row=Math.floor(containing_num[1][0]/3)
                let box_col=Math.floor(containing_num[1][1]/3)
                for (let i=0;i<9;i++){

                    if(  i%3!=containing_num[0][1]%3){
                        result.push(object[3*(box_col+box_row*9)+i%3+Math.floor(i/3)*9])
                    }
                }
                if(remover(result,[num])){return false}
            }
           
        }
    }

    if(relation=='row'){
        if(containing_num.length==2){
            if(Math.floor(containing_num[1][1]/3)==Math.floor(containing_num[0][1] /3)){
                let result=[]
                let box_row=Math.floor(containing_num[1][0]/3)
                let box_col=Math.floor(containing_num[1][1]/3)
                for (let i=0;i<9;i++){

                    if(Math.floor(i/3)!=containing_num[0][0]%3){
                        result.push(object[3*(box_col+box_row*9)+i%3+Math.floor(i/3)*9])
                    }
                }
                
                if(remover(result,[num])){ return false}
            }
        }
        if(containing_num.length==3){
            if(Math.floor(containing_num[0][1] /3)==Math.floor(containing_num[1][1] /3) && Math.floor(containing_num[0][1] /3)==Math.floor(containing_num[2][1] /3) ){
                let result=[]
                let box_row=Math.floor(containing_num[1][0]/3)
                let box_col=Math.floor(containing_num[1][1]/3)
                for (let i=0;i<9;i++){

                    if(Math.floor(i/3)!=containing_num[0][0]%3){
                        result.push(object[3*(box_col+box_row*9)+i%3+Math.floor(i/3)*9])
                    }
                }
                if(remover(result,[num])){return false}
            }
           
        }
    }

    if(relation=='box'){

        if(containing_num.length==2){
            if(containing_num[1][0]==containing_num[0][0] ){
                let result=[]
                let box_row=containing_num[1][0]
                for (let i=0;i<9;i++){

                    if(Math.floor(i/3)!=containing_num[0][0]){
                        result.push(object[box_row*9+i])
                    }
                }
                if(remover(result,[num])){return false}
            }
            if(containing_num[1][1]==containing_num[0][1]){
                let result=[]
                let box_col=containing_num[1][1]
                for (let i=0;i<9;i++){

                    if(Math.floor(i/3)!=containing_num[0][1]){
                        result.push(object[i*9+box_col])
                    }
                }
                if(remover(result,[num])){return false}
            }
        }
        if(containing_num.length==3){
            if(containing_num[1][1]==containing_num[0][1]  && containing_num[1][1]==containing_num[2][1]){
                let result=[]
                let box_row=containing_num[1][0]
                for (let i=0;i<9;i++){
                    if(Math.floor(i/3)!=containing_num[0][0]){
                        result.push(object[box_row*9+i])
                    }
                }
                if(remover(result,[num])){return false}
            }
            if(containing_num[1][1]==containing_num[0][1]  && containing_num[1][1]==containing_num[2][1]){
                let result=[]
                let box_col=containing_num[1][1]
                for (let i=0;i<9;i++){

                    if(Math.floor(i/3)!=containing_num[0][1]){
                        result.push(object[i*9+box_col])
                    }
                }
                if(remover(result,[num])){return false}
            }
        }
    }

    return true
}


//solve_object(problem)




































///////////////////////////////////outdated method///////////////////////////////////////////
function check_possibile_and_add(p){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let possibles=possible_numbers(p,i,j)
            if(possibles!=-1){
                if(possibles.length==1){
                    let new_p=add_num(p,possibles[0],i,j)
                    return new_p
                }
                else{
                    for(let k=0;k<possibles.length;k++){
                        if(only_acceptable_candidate(p,possibles[k],i,j)){
                            let new_p=add_num(p,possibles[k],i,j)
                            return new_p
                        }

                    }
                }


            }
        
        }   
    }
    return -1
}


async function solve_step_by_step(p){
    let new_p=check_possibile_and_add(p)
    while (new_p!=-1){
        await new Promise(r => setTimeout(r, 20));
        p=new_p
        write_problem_with_possible_numbers(p)
        new_p=check_possibile_and_add(p)
    }
   //await DFS_soduko(p)
}
function only_acceptable_candidate(p,num,row,col){
    let possible=true


    for(let i=0;i<9;i++){
        if(p[i][col]=='' && i!=row){
            if (check_number(p,num,i,col)){possible=false}
        }
    }
    if(possible){return true}

    for(let i=0;i<9;i++){
        if(p[row][i]=='' && i!=col){
            if (check_number(p,num,row,i)){possible=false}
        }
    }
    if(possible){return true}

    let box_col=Math.floor(col/3)*3
    let box_row=Math.floor(row/3)*3

    for (let i=0;i<3;i++){
        for (let j=0;j<3;j++){
            if(p[i+box_row][j+box_col]=='' && i!=row && j!=col){
                if (check_number(p,num,i+box_row,j+box_col)){possible=false}
            }   
        }
    }
    if(possible){return true}
    return false

}

//solve_step_by_step(problem)





















