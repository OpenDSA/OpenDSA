/* *** ODSATag: struct *** */
struct node {
    char key;
    struct node *left;
    struct node *right;
};

struct node *p, *f;
/* *** ODSAendTag: struct *** */

/* *** ODSATag: single *** */
// p is unbalanced, f is p's father
if (f->left == p) {
  if (height(p.left) > height(p.right)) {
    f->left = p->left;  // single rotation right
    p->left = f->left->right;
    f->left->right = p;
  } else { // height(p.left) < height(p.right)
    f->left = p->right; // single rotation left
    p->right = f->left->left;
    f->left->left = p;
  }
} else { // f->right == p
  if (height(p.left) < height(p.right)) {
    f->right = p->right; // single rotation left
    p->right = f->right->left;
    f->right->left = p;
  } else { // height(p.left) > height(p.right)
    f->right = p->left;  // single rotation right
    p->left = f->right->right;
    f->right->right = p;  
  }
}
/* *** ODSAendTag: single *** */

/* *** ODSATag: double *** */
// p is unbalanced, f is p's father
if (f->left == p) { 
  if (height(p.left) > height(p.right)) {
    f->left = p->left->right; // LR-double rotation
    p->left->right = f->left->left;
    f->left->left = p->left;
    p->left = f->left->right;
    f->left->right = p;
  } else { // height(p.left) < height(p.right)
    f->left = p->right->left; // RL-double rotation
    p->right->left = f->left->right;
    f->left->right = p->right;
    p->right = f->left->left;
    f->left->left = p;
  }
} else { // f->right == p
  if (height(p.left) < height(p.right) {
    f->right = p->right->left; // RL-double rotation
    p->right->left = f->right->right;
    f->right->right = p->right;
    p->right = f->right->left;
    f->right->left = p;
  } else { // height(p.left) > height(p.right)
    f->right = p->left->right; // LR-double rotation
    p->left->right = f->right->left;
    f->right->left = p->left;
    p->left = f->right->right;
    f->right->right = p;  
  }
}
/* *** ODSAendTag: double *** */
